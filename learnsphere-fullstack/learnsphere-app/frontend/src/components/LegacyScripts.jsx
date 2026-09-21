import { useEffect, useRef } from "react";

/**
 * Loads one or more existing (pre-React) <script> files, in order, against
 * the DOM that React has just rendered — then fires DOMContentLoaded (and
 * window 'load') exactly once, after the LAST script finishes loading.
 *
 * This is what lets the original vanilla-JS files (api.js, login.js, etc.)
 * keep working completely unchanged: they still do
 *   document.addEventListener("DOMContentLoaded", () => { ... })
 * and that still fires, at the right moment, against elements that now
 * happen to be rendered by React instead of static HTML.
 *
 * Firing the event only once (not once per script) matters because two of
 * these scripts often depend on each other — e.g. every page's script
 * calls apiRequest()/showToast() which are defined in api.js, so api.js
 * must finish executing before the page-specific script's own
 * DOMContentLoaded handler runs.
 */
function LegacyScripts({ sources }) {
    const loaded = useRef(false);

    useEffect(() => {
        // React 18 StrictMode runs effects twice in development; make sure
        // we only ever inject these scripts once per real mount.
        if (loaded.current) return;
        loaded.current = true;

        const injectedNodes = [];
        let cancelled = false;

        function loadNext(index) {
            if (cancelled) return;
            if (index >= sources.length) {
                document.dispatchEvent(new Event("DOMContentLoaded"));
                window.dispatchEvent(new Event("load"));
                return;
            }
            const script = document.createElement("script");
            script.src = sources[index];
            script.async = false;
            script.onload = () => loadNext(index + 1);
            script.onerror = (err) => {
                console.error("Unable to load legacy script:", sources[index], err);
                loadNext(index + 1);
            };
            document.body.appendChild(script);
            injectedNodes.push(script);
        }

        loadNext(0);

        return () => {
            cancelled = true;
            // Scripts stay in the DOM intentionally (removing them doesn't
            // undo their side effects, and StrictMode's dev-only
            // mount/unmount/remount cycle would otherwise re-run this).
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}

export default LegacyScripts;
