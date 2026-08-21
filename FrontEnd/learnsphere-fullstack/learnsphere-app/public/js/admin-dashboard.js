function statusBadgeClass(status) {
    if (status === 'Completed') return 'badge-soft-success';
    if (status === 'Active') return 'badge-soft-info';
    return 'badge-soft-warning';
}

function progressColor(pct) {
    if (pct >= 100) return 'var(--success)';
    if (pct >= 50) return 'var(--gradient-info)';
    return 'var(--gradient-accent)';
}

function courseStatsRow(c) {
    return `
    <tr>
      <td class="fw-600">${c.course}</td>
      <td>${c.enrolled}</td>
      <td>${c.completed}</td>
      <td>
        <span class="mini-progress"><span style="width:${c.avgProgress}%;background:${progressColor(c.avgProgress)}"></span></span>
        <small class="text-muted ms-2">${c.avgProgress}%</small>
      </td>
    </tr>`;
}

function registrationRow(r) {
    const initials = r.name.split(' ').filter(Boolean).slice(0, 2).map(n => n[0].toUpperCase()).join('');
    return `
    <tr>
      <td>
        <div class="d-flex align-items-center gap-2">
          <div class="av" style="width:34px;height:34px;font-size:12px;background:var(--gradient-primary)">${initials}</div>
          <div class="fw-600">${r.name}</div>
        </div>
      </td>
      <td>${r.degree} · ${r.year}</td>
      <td>${r.course}</td>
      <td>
        <span class="mini-progress"><span style="width:${r.progress}%;background:${progressColor(r.progress)}"></span></span>
        <small class="text-muted ms-2">${r.progress}%</small>
      </td>
      <td><span class="badge-soft ${statusBadgeClass(r.status)}">${r.status}</span></td>
    </tr>`;
}

function renderOverview(data) {
    const { stats, courseStats, registrations } = data;

    ['mTotalStudents', 'mTotalCourses', 'mTotalEnrollments', 'mCertificates'].forEach(id => {
        document.getElementById(id).classList.remove('skeleton');
    });
    document.getElementById('mTotalStudents').textContent = stats.totalStudents;
    document.getElementById('mTotalCourses').textContent = stats.totalCourses;
    document.getElementById('mTotalEnrollments').textContent = stats.totalEnrollments;
    document.getElementById('mCertificates').textContent = stats.certificatesIssued;

    const courseBody = document.getElementById('courseStatsBody');
    courseBody.innerHTML = courseStats.length
        ? courseStats.map(courseStatsRow).join('')
        : `<tr><td colspan="4" class="text-center text-muted py-4">No enrollments yet.</td></tr>`;

    const regBody = document.getElementById('registrationsBody');
    regBody.innerHTML = registrations.length
        ? registrations.map(registrationRow).join('')
        : `<tr><td colspan="5" class="text-center text-muted py-4">No registrations yet.</td></tr>`;

    document.getElementById('totalRegBadge').textContent = `${stats.totalStudents} total`;

    const completionRate = stats.totalEnrollments
        ? Math.round((stats.certificatesIssued / stats.totalEnrollments) * 100)
        : 0;
    document.getElementById('reportCompletionBar').style.width = completionRate + '%';
    document.getElementById('reportCompletionLabel').textContent =
        `${completionRate}% of enrollments completed (${stats.certificatesIssued} / ${stats.totalEnrollments})`;
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const me = await apiRequest('/me');
        document.getElementById('adminName').textContent = me.name;
        document.getElementById('adminAvatar').textContent = me.name.slice(0, 2).toUpperCase();

        const data = await apiRequest('/admin/overview');
        renderOverview(data);
    } catch (err) {
        if (err.status === 401) {
            window.location.href = 'admin-login.html';
        } else {
            showToast('Could not load admin data: ' + err.message, 'error');
        }
    }
});
