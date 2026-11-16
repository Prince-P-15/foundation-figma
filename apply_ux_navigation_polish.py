import re

with open("dashboard-v3.html", "r") as f:
    content = f.read()

# 1. Update .permanent-sidebar.collapsed to hide hubspot strip
old_collapsed_rule = """.permanent-sidebar.collapsed .sidebar-header {
  padding: 14px 6px 12px;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
}"""

new_collapsed_rule = """.permanent-sidebar.collapsed .sidebar-hubspot-strip {
  display: none !important;
}
.permanent-sidebar.collapsed .sidebar-header {
  padding: 14px 6px 12px;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
}"""

if old_collapsed_rule in content:
    content = content.replace(old_collapsed_rule, new_collapsed_rule)
    print("✓ Added .sidebar-hubspot-strip rule for collapsed sidebar")

# 2. Update getAdminTabTitle and getTabTitle
old_tab_titles = """function getAdminTabTitle(tabId) {
  const titles = {
    'clients': 'Portfolio Health, Retainers & Telemetry',
    'milestones': 'SOW Milestone Approval Pipeline',
    'hubspot': 'HubSpot Closed-Won Deals & Invites',
    'ecosystem': 'York IE 18-Product Ecosystem Catalog',
    'tickets': 'Portfolio Technical Support Incident Queue'
  };
  return titles[tabId] || 'Admin Console';
}
function getTabTitle(tabId) {
  const titles = {
    'workspaces': 'Active Workspaces & Software Tools',
    'products': 'Active Workspaces & Software Tools',
    'initiatives': 'Strategic Growth Initiatives & Milestones',
    'milestones': 'Strategic Growth Initiatives & Milestones',
    'tickets': 'Technical Support & Incident Desk',
    'team': 'Team Members & RBAC Permissions',
    'ecosystem': 'York IE 18-Product Ecosystem Catalog'
  };
  return titles[tabId] || 'Workspace';
}"""

new_tab_titles = """function getAdminTabTitle(tabId) {
  const titles = {
    'clients': 'Portfolio Directory',
    'active_accounts': 'Active Accounts',
    'tickets': 'Support Incidents',
    'products': 'Software Catalog',
    'ecosystem': 'Software Catalog',
    'milestones': 'SOW Milestone Approval Pipeline',
    'hubspot': 'HubSpot Closed-Won Deals'
  };
  return titles[tabId] || 'Portfolio Directory';
}
function getTabTitle(tabId) {
  const titles = {
    'workspaces': 'Workspaces',
    'products': 'Workspaces',
    'milestones': 'SOW Deliverables',
    'initiatives': 'SOW Deliverables',
    'threat-radar': 'Market Radar',
    'perks': 'Partner Perks',
    'tickets': 'Support Desk',
    'team': 'Team & Permissions',
    'ecosystem': 'Ecosystem Catalog'
  };
  return titles[tabId] || 'Workspaces';
}"""

if old_tab_titles in content:
    content = content.replace(old_tab_titles, new_tab_titles)
    print("✓ Updated getAdminTabTitle and getTabTitle")
else:
    print("! Could not find old_tab_titles")

# 3. Update Admin Sidebar navigation
old_admin_sidebar = """        <!-- HubSpot CRM Sync Strip -->
        <div style="margin: 4px 14px 10px; padding: 7px 12px; background: var(--bg-subtle); border: 1px solid var(--line); border-radius: 10px; display: flex; align-items: center; justify-content: space-between; font-size: 11px;">
          <div style="display: flex; align-items: center; gap: 6px; font-weight: 600; color: var(--text-secondary);">
            <span style="width: 7px; height: 7px; border-radius: 50%; background: #10B981; display: inline-block;" class="animate-pulse"></span>
            <span style="font-size: 11px;">HubSpot: Connected</span>
          </div>
          <button onclick="app.syncHubSpot()" style="font-size: 10.5px; font-weight: 700; color: var(--emerald-dark); background: var(--bg-card); border: 1px solid var(--line); padding: 2px 7px; border-radius: 6px; cursor: pointer;" title="Sync CRM Deals & Pipeline">
            Sync
          </button>
        </div>

        <!-- Primary Top Navigation -->
        <nav class="sidebar-primary-nav" aria-label="Main Navigation">
          <button type="button" class="sidebar-main-nav-btn ${app.adminTab === 'clients' ? 'active' : ''}" onclick="app.adminTab = 'clients'; app.adminFilterStatus = 'all'; app.saveState(); render();">
            <i data-lucide="building"></i>
            <span style="flex:1;text-align:left;">Company Portfolio</span>
            <span class="sidebar-badge">${app.clients.length}</span>
          </button>
          <button type="button" class="sidebar-main-nav-btn ${app.adminTab === 'active_accounts' ? 'active' : ''}" onclick="app.adminTab = 'active_accounts'; app.adminFilterStatus = 'all'; app.saveState(); render();">
            <i data-lucide="activity"></i>
            <span style="flex:1;text-align:left;">Active Accounts</span>
            <span class="sidebar-badge">${activeClientsCount}</span>
          </button>
          <button type="button" class="sidebar-main-nav-btn ${app.adminTab === 'tickets' ? 'active' : ''}" onclick="app.adminTab = 'tickets'; app.saveState(); render();">
            <i data-lucide="life-buoy"></i>
            <span style="flex:1;text-align:left;">Support Incidents</span>
            ${openTicketsCount > 0 ? `<span class="sidebar-badge" style="background: rgba(245, 158, 11, 0.2); color: #B45309;">${openTicketsCount} Open</span>` : `<span class="sidebar-badge">0</span>`}
          </button>
        </nav>

        <!-- Catalog Section -->
        <div class="sidebar-nav-scroll">
          <div class="sidebar-category-group">
            <div class="sidebar-category-title">Ecosystem & Catalog</div>
            <button type="button" class="sidebar-nav-item ${app.adminTab === 'products' ? 'active' : ''}" onclick="app.adminTab = 'products'; app.saveState(); render();">
              <i data-lucide="layers"></i>
              <span class="sidebar-nav-label">Explore Products</span>
              <span class="sidebar-badge">${PRODUCTS_CATALOG.length}</span>
            </button>
          </div>
        </div>"""

new_admin_sidebar = """        <!-- HubSpot CRM Sync Strip -->
        <div class="sidebar-hubspot-strip" style="margin: 4px 14px 10px; padding: 7px 12px; background: var(--bg-subtle); border: 1px solid var(--line); border-radius: 10px; display: flex; align-items: center; justify-content: space-between; font-size: 11px;">
          <div style="display: flex; align-items: center; gap: 6px; font-weight: 600; color: var(--text-secondary);">
            <span style="width: 7px; height: 7px; border-radius: 50%; background: #10B981; display: inline-block;" class="animate-pulse"></span>
            <span style="font-size: 11px;">HubSpot: Connected</span>
          </div>
          <button onclick="app.syncHubSpot()" style="font-size: 10.5px; font-weight: 700; color: var(--emerald-dark); background: var(--bg-card); border: 1px solid var(--line); padding: 2px 7px; border-radius: 6px; cursor: pointer;" title="Sync CRM Deals & Pipeline">
            Sync
          </button>
        </div>

        <!-- Primary Top Navigation -->
        <nav class="sidebar-primary-nav" aria-label="Main Navigation">
          <div class="sidebar-category-title" style="padding-left: 6px; padding-bottom: 6px;">Portfolio Operations</div>
          <button type="button" class="sidebar-main-nav-btn ${app.adminTab === 'clients' ? 'active' : ''}" onclick="app.adminTab = 'clients'; app.adminFilterStatus = 'all'; app.saveState(); render();" title="Portfolio Directory">
            <i data-lucide="building"></i>
            <span style="flex:1;text-align:left;">Portfolio Directory</span>
            <span class="sidebar-badge">${app.clients.length}</span>
          </button>
          <button type="button" class="sidebar-main-nav-btn ${app.adminTab === 'active_accounts' ? 'active' : ''}" onclick="app.adminTab = 'active_accounts'; app.adminFilterStatus = 'all'; app.saveState(); render();" title="Active Accounts & Operational Health">
            <i data-lucide="activity"></i>
            <span style="flex:1;text-align:left;">Active Accounts</span>
            <span class="sidebar-badge">${activeClientsCount}</span>
          </button>
          <button type="button" class="sidebar-main-nav-btn ${app.adminTab === 'tickets' ? 'active' : ''}" onclick="app.adminTab = 'tickets'; app.saveState(); render();" title="Support Incident Queue">
            <i data-lucide="life-buoy"></i>
            <span style="flex:1;text-align:left;">Support Incidents</span>
            ${openTicketsCount > 0 ? `<span class="sidebar-badge" style="background: rgba(245, 158, 11, 0.2); color: #B45309;">${openTicketsCount} Open</span>` : `<span class="sidebar-badge">0</span>`}
          </button>
        </nav>

        <!-- Platform & Tools Section -->
        <div class="sidebar-nav-scroll">
          <div class="sidebar-category-group">
            <div class="sidebar-category-title">Platform &amp; Tools</div>
            <button type="button" class="sidebar-nav-item ${app.adminTab === 'products' ? 'active' : ''}" onclick="app.adminTab = 'products'; app.saveState(); render();" title="Software Catalog (18 Products)">
              <i data-lucide="layers"></i>
              <span class="sidebar-nav-label">Software Catalog</span>
              <span class="sidebar-badge">${PRODUCTS_CATALOG.length}</span>
            </button>
          </div>
        </div>"""

if old_admin_sidebar in content:
    content = content.replace(old_admin_sidebar, new_admin_sidebar)
    print("✓ Updated Admin Sidebar navigation with clear UX hierarchy")
else:
    print("! Could not find old_admin_sidebar")

# 4. Update Client Sidebar navigation
old_client_sidebar = """        <!-- Primary Top Navigation for Client -->
        <nav class="sidebar-primary-nav" aria-label="Client Main Navigation">
          <button type="button" class="sidebar-main-nav-btn ${tab === 'workspaces' ? 'active' : ''}" onclick="app.clientTab = 'workspaces'; app.saveState(); render();">
            <i data-lucide="rocket"></i>
            <span style="flex:1;text-align:left;">Workspaces Hub</span>
            <span class="sidebar-badge">${(client.grantedProducts || []).length} Active</span>
          </button>
          <button type="button" class="sidebar-main-nav-btn ${tab === 'milestones' ? 'active' : ''}" onclick="app.clientTab = 'milestones'; app.saveState(); render();">
            <i data-lucide="target"></i>
            <span style="flex:1;text-align:left;">SOW Milestones</span>
            <span class="sidebar-badge">${(client.milestones || []).filter(m => m.stage === 'approved').length}/${(client.milestones || []).length}</span>
          </button>
          <button type="button" class="sidebar-main-nav-btn ${tab === 'perks' ? 'active' : ''}" onclick="app.clientTab = 'perks'; app.saveState(); render();">
            <i data-lucide="gift"></i>
            <span style="flex:1;text-align:left;">Syndicate Perks</span>
            <span class="sidebar-badge" style="background: rgba(147, 51, 234, 0.15); color: #7C3AED;">$250k+</span>
          </button>
          <button type="button" class="sidebar-main-nav-btn ${tab === 'threat-radar' ? 'active' : ''}" onclick="app.clientTab = 'threat-radar'; app.saveState(); render();">
            <i data-lucide="radar"></i>
            <span style="flex:1;text-align:left;">Market Threat Radar</span>
            <span class="sidebar-badge" style="background: rgba(234, 88, 12, 0.15); color: #C2410C;">Live</span>
          </button>
        </nav>

        <!-- Secondary Collaboration Navigation -->
        <div class="sidebar-nav-scroll">
          <div class="sidebar-category-group">
            <div class="sidebar-category-title">Collaboration</div>
            <button type="button" class="sidebar-nav-item ${tab === 'tickets' ? 'active' : ''}" onclick="app.clientTab = 'tickets'; app.saveState(); render();">
              <i data-lucide="life-buoy"></i>
              <span class="sidebar-nav-label">Support Desk</span>
              <span class="sidebar-badge">${(client.supportTickets || []).length}</span>
            </button>
            <button type="button" class="sidebar-nav-item ${tab === 'team' ? 'active' : ''}" onclick="app.clientTab = 'team'; app.saveState(); render();">
              <i data-lucide="users"></i>
              <span class="sidebar-nav-label">Team &amp; Access</span>
              <span class="sidebar-badge">${(client.team || []).length}</span>
            </button>
            <button type="button" class="sidebar-nav-item ${tab === 'ecosystem' ? 'active' : ''}" onclick="app.clientTab = 'ecosystem'; app.saveState(); render();">
              <i data-lucide="sparkles"></i>
              <span class="sidebar-nav-label">York Ecosystem</span>
              <span class="sidebar-badge">18</span>
            </button>
          </div>
        </div>"""

new_client_sidebar = """        <!-- Primary Top Navigation for Client -->
        <nav class="sidebar-primary-nav" aria-label="Client Main Navigation">
          <div class="sidebar-category-title" style="padding-left: 6px; padding-bottom: 6px;">Growth &amp; Delivery</div>
          <button type="button" class="sidebar-main-nav-btn ${tab === 'workspaces' ? 'active' : ''}" onclick="app.clientTab = 'workspaces'; app.saveState(); render();" title="Active Workspaces &amp; SSO Launch">
            <i data-lucide="rocket"></i>
            <span style="flex:1;text-align:left;">Workspaces</span>
            <span class="sidebar-badge">${(client.grantedProducts || []).length} Active</span>
          </button>
          <button type="button" class="sidebar-main-nav-btn ${tab === 'milestones' ? 'active' : ''}" onclick="app.clientTab = 'milestones'; app.saveState(); render();" title="SOW Deliverables &amp; Milestones">
            <i data-lucide="target"></i>
            <span style="flex:1;text-align:left;">SOW Deliverables</span>
            <span class="sidebar-badge">${(client.milestones || []).filter(m => m.stage === 'approved').length}/${(client.milestones || []).length}</span>
          </button>
          <button type="button" class="sidebar-main-nav-btn ${tab === 'threat-radar' ? 'active' : ''}" onclick="app.clientTab = 'threat-radar'; app.saveState(); render();" title="Market Radar &amp; Competitive Intelligence">
            <i data-lucide="radar"></i>
            <span style="flex:1;text-align:left;">Market Radar</span>
            <span class="sidebar-badge" style="background: rgba(234, 88, 12, 0.15); color: #C2410C;">Live</span>
          </button>
          <button type="button" class="sidebar-main-nav-btn ${tab === 'perks' ? 'active' : ''}" onclick="app.clientTab = 'perks'; app.saveState(); render();" title="Partner Perks ($250k+ Cloud Credits)">
            <i data-lucide="gift"></i>
            <span style="flex:1;text-align:left;">Partner Perks</span>
            <span class="sidebar-badge" style="background: rgba(147, 51, 234, 0.15); color: #7C3AED;">$250k+</span>
          </button>
        </nav>

        <!-- Secondary Collaboration Navigation -->
        <div class="sidebar-nav-scroll">
          <div class="sidebar-category-group">
            <div class="sidebar-category-title">Organization &amp; Support</div>
            <button type="button" class="sidebar-nav-item ${tab === 'tickets' ? 'active' : ''}" onclick="app.clientTab = 'tickets'; app.saveState(); render();" title="Support Desk &amp; Incidents">
              <i data-lucide="life-buoy"></i>
              <span class="sidebar-nav-label">Support Desk</span>
              <span class="sidebar-badge">${(client.supportTickets || []).length}</span>
            </button>
            <button type="button" class="sidebar-nav-item ${tab === 'team' ? 'active' : ''}" onclick="app.clientTab = 'team'; app.saveState(); render();" title="Team &amp; Access Permissions">
              <i data-lucide="users"></i>
              <span class="sidebar-nav-label">Team &amp; Permissions</span>
              <span class="sidebar-badge">${(client.team || []).length}</span>
            </button>
            <button type="button" class="sidebar-nav-item ${tab === 'ecosystem' ? 'active' : ''}" onclick="app.clientTab = 'ecosystem'; app.saveState(); render();" title="Ecosystem Catalog (18 Products)">
              <i data-lucide="sparkles"></i>
              <span class="sidebar-nav-label">Ecosystem Catalog</span>
              <span class="sidebar-badge">18</span>
            </button>
          </div>
        </div>"""

if old_client_sidebar in content:
    content = content.replace(old_client_sidebar, new_client_sidebar)
    print("✓ Updated Client Sidebar navigation with clear UX hierarchy")
else:
    print("! Could not find old_client_sidebar")

# 5. Update Table Headers in renderAdminCompaniesTab
old_admin_comp_th = """              <tr>
                <th style="padding: 14px 20px;">1. Company Details</th>
                <th style="padding: 14px 20px;">2. Assigned Services</th>
                <th style="padding: 14px 20px; text-align: right;">3. Actions</th>
              </tr>"""

new_admin_comp_th = """              <tr>
                <th style="padding: 14px 20px;">Company</th>
                <th style="padding: 14px 20px;">Assigned Services</th>
                <th style="padding: 14px 20px; text-align: right;">Actions</th>
              </tr>"""

if old_admin_comp_th in content:
    content = content.replace(old_admin_comp_th, new_admin_comp_th)
    print("✓ Updated Portfolio Directory table headers (removed 1. 2. 3. numbers)")
else:
    print("! Could not find old_admin_comp_th")

# 6. Update Table Headers in renderAdminActiveAccountsTab
old_admin_active_th = """              <tr>
                <th style="padding: 14px 20px;">1. Company</th>
                <th style="padding: 14px 16px;">2. Primary Contact</th>
                <th style="padding: 14px 16px;">3. Status</th>
                <th style="padding: 14px 16px;">4. Blockers</th>
                <th style="padding: 14px 16px;">5. Tokens Used</th>
                <th style="padding: 14px 20px; text-align: right;">6. Action</th>
              </tr>"""

new_admin_active_th = """              <tr>
                <th style="padding: 14px 20px;">Company</th>
                <th style="padding: 14px 16px;">Primary Contact</th>
                <th style="padding: 14px 16px;">Status</th>
                <th style="padding: 14px 16px;">Blockers</th>
                <th style="padding: 14px 16px;">Tokens Used</th>
                <th style="padding: 14px 20px; text-align: right;">Action</th>
              </tr>"""

if old_admin_active_th in content:
    content = content.replace(old_admin_active_th, new_admin_active_th)
    print("✓ Updated Active Accounts table headers (removed 1. 2. 3. 4. 5. 6. numbers)")
else:
    print("! Could not find old_admin_active_th")

# 7. Update Table Headers in renderAdminTicketsQueueTab
old_admin_tickets_th = """              <tr>
                <th style="padding: 14px 20px;">Issue &amp; Client</th>
                <th style="padding: 14px 16px;">Platform Tool</th>
                <th style="padding: 14px 16px;">Severity</th>
                <th style="padding: 14px 16px;">Status</th>
                <th style="padding: 14px 16px;">York Assignee</th>
                <th style="padding: 14px 20px; text-align: right;">Action</th>
              </tr>"""

new_admin_tickets_th = """              <tr>
                <th style="padding: 14px 20px;">Incident &amp; Client</th>
                <th style="padding: 14px 16px;">Product</th>
                <th style="padding: 14px 16px;">Severity</th>
                <th style="padding: 14px 16px;">Status</th>
                <th style="padding: 14px 16px;">Assignee</th>
                <th style="padding: 14px 20px; text-align: right;">Action</th>
              </tr>"""

if old_admin_tickets_th in content:
    content = content.replace(old_admin_tickets_th, new_admin_tickets_th)
    print("✓ Updated Admin Support Incidents table headers")
else:
    print("! Could not find old_admin_tickets_th")

# 8. Update Client Milestones stages
old_stages = """  const stages = [
    { key: 'scoping', label: '1. Scoping' },
    { key: 'in_progress', label: '2. In Progress' },
    { key: 'client_review', label: '3. Awaiting Sign-Off' },
    { key: 'approved', label: '4. Approved & Completed' }
  ];"""

new_stages = """  const stages = [
    { key: 'scoping', label: 'Scoping' },
    { key: 'in_progress', label: 'In Progress' },
    { key: 'client_review', label: 'Awaiting Sign-Off' },
    { key: 'approved', label: 'Approved & Completed' }
  ];"""

if old_stages in content:
    content = content.replace(old_stages, new_stages)
    print("✓ Updated SOW Deliverables stages (removed 1. 2. 3. 4. numbers)")
else:
    print("! Could not find old_stages")

# 9. Update Client Support Tickets table headers
old_client_tickets_th = """              <tr>
                <th class="py-3.5 px-6">Issue &amp; Description</th>
                <th class="py-3.5 px-4">Platform Tool</th>
                <th class="py-3.5 px-4">Severity</th>
                <th class="py-3.5 px-4">Status</th>
                <th class="py-3.5 px-6 text-right">Created</th>
              </tr>"""

new_client_tickets_th = """              <tr>
                <th class="py-3.5 px-6">Incident &amp; Description</th>
                <th class="py-3.5 px-4">Product</th>
                <th class="py-3.5 px-4">Severity</th>
                <th class="py-3.5 px-4">Status</th>
                <th class="py-3.5 px-6 text-right">Created</th>
              </tr>"""

if old_client_tickets_th in content:
    content = content.replace(old_client_tickets_th, new_client_tickets_th)
    print("✓ Updated Client Support Desk table headers")
else:
    print("! Could not find old_client_tickets_th")

# 10. Update Headlines & Subtitles for clean UX
# In renderAdminCompaniesTab:
content = content.replace(
    '<h1 class="page-headline-lead">Company Portfolio Directory</h1>',
    '<h1 class="page-headline-lead">Portfolio Directory</h1>'
)
content = content.replace(
    '<span>+ Add Company</span>',
    '<span>+ Onboard Company</span>'
)

# In renderAdminActiveAccountsTab:
content = content.replace(
    '<h1 class="page-headline-lead">Active Accounts &amp; Service Operations</h1>',
    '<h1 class="page-headline-lead">Active Accounts</h1>'
)

# In renderClientWorkspacesTab:
content = content.replace(
    '<h1 class="page-headline-lead">Active Workspaces &amp; Software Tools</h1>',
    '<h1 class="page-headline-lead">Workspaces</h1>'
)
content = content.replace(
    '<span>Browse Full Ecosystem</span>',
    '<span>Explore All 18 Products</span>'
)

# In renderClientMilestonesTab:
content = content.replace(
    '<h1 class="page-headline-lead">SOW Milestones &amp; Deliverables</h1>',
    '<h1 class="page-headline-lead">SOW Deliverables</h1>'
)

# In renderClientPerksTab:
content = content.replace(
    '<h1 class="page-headline-lead">Syndicate Partner Cloud Credits &amp; Perks</h1>',
    '<h1 class="page-headline-lead">Partner Perks</h1>'
)

# In renderClientTeamTab:
content = content.replace(
    '<h1 class="page-headline-lead">Team &amp; Access Management</h1>',
    '<h1 class="page-headline-lead">Team &amp; Permissions</h1>'
)

# In renderClientEcosystemTab:
content = content.replace(
    '<h1 class="page-headline-lead">York IE 18-Product Ecosystem</h1>',
    '<h1 class="page-headline-lead">Ecosystem Catalog</h1>'
)

# 11. In renderClientThreatRadarTab, add unified section title
old_threat_head = """function renderClientThreatRadarTab(client) {
  const radar = client.competitorRadar || { trackedCompetitors: [], signals: [] };

  return `
    <div class="space-y-6">
      
      <!-- Animated Visual Radar Scope Widget -->"""

new_threat_head = """function renderClientThreatRadarTab(client) {
  const radar = client.competitorRadar || { trackedCompetitors: [], signals: [] };

  return `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      
      <!-- Section Title & Controls Row -->
      <section class="title-controls-row">
        <div class="page-headline-wrap">
          <h1 class="page-headline-lead">Market Radar</h1>
          <p style="font-size: 12.5px; color: var(--text-muted); margin-top: 2px;">
            Real-time competitive signals, pricing shifts, and strategic countermeasures.
          </p>
        </div>

        <div class="controls-pill-row">
          <button onclick="openAddCompetitorModal()" class="export-pill-btn" style="height: 38px; padding: 0 16px;">
            <i data-lucide="plus"></i>
            <span>Track Competitor</span>
          </button>
        </div>
      </section>
      
      <!-- Animated Visual Radar Scope Widget -->"""

if old_threat_head in content:
    content = content.replace(old_threat_head, new_threat_head)
    print("✓ Added unified title row to Market Radar")
else:
    print("! Could not find old_threat_head")

# 12. In renderClientTicketsTab, add unified section title
old_tickets_head = """function renderClientTicketsTab(client) {
  const tickets = client.supportTickets || [];
  const openCount = tickets.filter(t => t.status !== 'resolved').length;
  const resolvedCount = tickets.filter(t => t.status === 'resolved').length;

  return `
    <div class="space-y-6">
      
      <!-- Top Metrics Header Cards -->"""

new_tickets_head = """function renderClientTicketsTab(client) {
  const tickets = client.supportTickets || [];
  const openCount = tickets.filter(t => t.status !== 'resolved').length;
  const resolvedCount = tickets.filter(t => t.status === 'resolved').length;

  return `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      
      <!-- Section Title & Controls Row -->
      <section class="title-controls-row">
        <div class="page-headline-wrap">
          <h1 class="page-headline-lead">Support Desk</h1>
          <p style="font-size: 12.5px; color: var(--text-muted); margin-top: 2px;">
            Submit technical requests and track real-time SLA resolution progress.
          </p>
        </div>

        <div class="controls-pill-row">
          <button onclick="openNewTicketModal()" class="export-pill-btn" style="height: 38px; padding: 0 16px;">
            <i data-lucide="plus"></i>
            <span>Raise Support Ticket</span>
          </button>
        </div>
      </section>
      
      <!-- Top Metrics Header Cards -->"""

if old_tickets_head in content:
    content = content.replace(old_tickets_head, new_tickets_head)
    print("✓ Added unified title row to Client Support Desk")
else:
    print("! Could not find old_tickets_head")

# 13. In renderAdminProductsCatalogTab, polish title row and make dark-mode compatible
old_admin_prod_head = """  return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-bold text-slate-900 tracking-tight">York IE 18-Product Suite</h2>
          <p class="text-xs text-slate-500 mt-0.5">
            18 B2B software solutions organized across 5 core stages: Decide, Execute, Measure, Assess, and Operate.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <div class="relative w-64">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              ${getIconSvg("Search", 14)}
            </div>
            <input 
              type="text" 
              value="${app.adminProductSearchQuery || ""}" 
              oninput="app.setAdminProductSearchQuery(this.value)" 
              placeholder="Search 18 products..." 
              class="w-full pl-9 pr-8 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-2xs transition-all"
            />
          </div>

          <div class="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs text-xs overflow-x-auto">
            ${['all', 'decide', 'execute', 'measure', 'assess', 'operate'].map(stage => `
              <button 
                onclick="app.setAdminProductFilterStage('${stage}')"
                class="px-2.5 py-1 rounded-lg font-semibold capitalize transition-all ${
                  currentStage === stage ? "bg-[#084c36] text-white shadow-2xs" : "text-slate-600 hover:bg-slate-100"
                }"
              >
                ${stage}
              </button>
            `).join('')}
          </div>
        </div>
      </div>"""

new_admin_prod_head = """  return `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      
      <!-- Section Title & Controls Row -->
      <section class="title-controls-row">
        <div class="page-headline-wrap">
          <h1 class="page-headline-lead">Software Catalog</h1>
          <p style="font-size: 12.5px; color: var(--text-muted); margin-top: 2px;">
            18 B2B software solutions organized across 5 core stages: Decide, Execute, Measure, Assess, and Operate.
          </p>
        </div>

        <div class="controls-pill-row">
          <div style="position: relative; width: 220px;">
            <i data-lucide="search" style="position: absolute; left: 12px; top: 11px; width: 14px; height: 14px; color: var(--text-muted); pointer-events: none;"></i>
            <input 
              type="text" 
              value="${app.adminProductSearchQuery || ""}" 
              oninput="app.setAdminProductSearchQuery(this.value)" 
              placeholder="Search 18 products..." 
              style="width: 100%; height: 38px; padding-left: 36px; padding-right: 12px; border-radius: var(--radius-pill); background: var(--bg-card); border: 1px solid var(--line); color: var(--text-main); font-size: 12px; outline: none; transition: border-color 0.15s ease;"
              onfocus="this.style.borderColor='var(--emerald)'"
              onblur="this.style.borderColor='var(--line)'"
            />
          </div>

          <div style="display: inline-flex; align-items: center; gap: 4px; padding: 3px; background: var(--bg-card); border: 1px solid var(--line); border-radius: var(--radius-pill);">
            ${['all', 'decide', 'execute', 'measure', 'assess', 'operate'].map(stage => `
              <button 
                onclick="app.setAdminProductFilterStage('${stage}')"
                style="height: 30px; padding: 0 12px; border-radius: var(--radius-pill); font-size: 11.5px; font-weight: 600; text-transform: capitalize; border: none; cursor: pointer; transition: all 0.15s ease; ${
                  currentStage === stage 
                    ? 'background: var(--emerald-dark); color: #ffffff;' 
                    : 'background: transparent; color: var(--text-secondary);'
                }"
              >
                ${stage === 'all' ? 'All Stages' : stage}
              </button>
            `).join('')}
          </div>
        </div>
      </section>"""

if old_admin_prod_head in content:
    content = content.replace(old_admin_prod_head, new_admin_prod_head)
    print("✓ Polished Software Catalog title controls and tokenized colors")
else:
    print("! Could not find old_admin_prod_head")

with open("dashboard-v3.html", "w") as f:
    f.write(content)

with open("export/dashboard-v3.html", "w") as f:
    f.write(content)

print("✓ All updates written to dashboard-v3.html and export/dashboard-v3.html")
