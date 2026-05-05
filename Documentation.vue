<template>
  <div class="docs-layout">
    <nav class="docs-sidebar" :class="{ 'mobile-open': mobileMenuOpen }">
      <div class="sidebar-header">
        <router-link to="/" class="brand">
          <span class="brand-text">SubmitraX</span>
          <span class="docs-badge">Docs</span>
        </router-link>
        <button class="mobile-close" @click="mobileMenuOpen = false"><X :size="20" /></button>
      </div>

      <div class="sidebar-content">
        <div v-for="(group, index) in navigation" :key="index" class="nav-group">
          <h3 class="group-title">{{ group.title }}</h3>
          <ul class="group-items">
            <li v-for="item in group.items" :key="item.id">
              <a 
                href="#" 
                @click.prevent="setActiveSection(item.id)"
                :class="{ active: activeSection === item.id }"
                class="nav-item"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="docs-main">
      <header class="docs-header">
        <div class="header-left">
          <button class="mobile-toggle" @click="mobileMenuOpen = true">
            <Menu :size="20" />
          </button>
          <div class="breadcrumb">
            <span>Documentation</span>
            <span class="separator">/</span>
            <span class="current-page">{{ activeCategoryLabel }}</span>
          </div>
        </div>
        <div class="header-right">
          <router-link v-if="!isLoggedIn" to="/login" class="btn-login">Login</router-link>
          <router-link v-else to="/workspace" class="btn-dashboard">Dashboard</router-link>
        </div>
      </header>

      <main class="content-area">
        <div class="content-wrapper">
          <!-- Introduction -->
          <section v-if="activeSection === 'introduction'" class="doc-section">
            <h1>Introduction</h1>
            <p class="lead">SubmitraX is a powerful form backend for modern developers. Connect your forms to our API and we'll handle the rest.</p>
            
            <h3>Why SubmitraX?</h3>
            <p>Building form backends is repetitive and time-consuming. SubmitraX provides a robust solution for handling form submissions, emails, integrations, and spam protection, allowing you to focus on building your frontend.</p>
            
            <div class="info-card">
              <div class="card-icon"><Lightbulb :size="20" /></div>
              <div class="card-body">
                <h4>Quick Tip</h4>
                <p>You can get started in less than a minute. No server-side code required.</p>
              </div>
            </div>

            <h3>Key Features</h3>
            <div class="features-grid">
              <div class="feature-item">
                <span class="icon"><Mail :size="20" /></span>
                <div>
                  <strong>Email Notifications</strong>
                  <p>Get notified instantly when someone submits your form.</p>
                </div>
              </div>
              <div class="feature-item">
                <span class="icon"><Shield :size="20" /></span>
                <div>
                  <strong>Spam Protection</strong>
                  <p>Advanced filtering and honeypot support out of the box.</p>
                </div>
              </div>
              <div class="feature-item">
                <span class="icon"><Plug :size="20" /></span>
                <div>
                  <strong>Integrations</strong>
                  <p>Connect to Slack, Discord, Zapier and more.</p>
                </div>
              </div>
              <div class="feature-item">
                <span class="icon"><BarChart2 :size="20" /></span>
                <div>
                  <strong>Analytics</strong>
                  <p>Track your form performance with detailed insights.</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Setup -->
          <section v-if="activeSection === 'setup'" class="doc-section">
            <h1>Getting Started</h1>
            <p>Follow these simple steps to start receiving submissions.</p>

            <h3>1. Create an account</h3>
            <p>If you haven't already, <router-link to="/register">create a free SubmitraX account</router-link>.</p>

            <h3>2. Create a form</h3>
            <p>From your dashboard, create a new form. Give it a descriptive name to stay organized.</p>

            <h3>3. Get your Form ID</h3>
            <p>Each form has a unique ID (e.g., <code>abcd1234</code>). You'll need this to point your form to our API.</p>

            <div class="code-block">
              <div class="code-header">
                <span class="lang">Example Endpoint</span>
                <button class="copy-btn" @click="copyText('https://s.submitrax.com/97c38579c6a13b215c9edcdc638612d4')">Copy</button>
              </div>
              <pre><code>https://s.submitrax.com/97c38579c6a13b215c9edcdc638612d4</code></pre>
            </div>
          </section>

          <!-- HTML Form -->
          <section v-if="activeSection === 'html-form'" class="doc-section">
            <h1>HTML Forms</h1>
            <p>The simplest way to use SubmitraX is by setting the <code>action</code> attribute of your HTML form.</p>

            <h3>Basics</h3>
            <p>Set your form's <code>action</code> to SubmitraX and ensure the <code>method</code> is set to <code>POST</code>.</p>

            <div class="code-block">
              <div class="code-header">
                <span class="lang">HTML</span>
              </div>
              <pre><code>&lt;form action="https://s.submitrax.com/YOUR_FORM_ID" method="POST"&gt;
  &lt;label for="email"&gt;Email&lt;/label&gt;
  &lt;input type="email" name="email" id="email" required&gt;

  &lt;label for="message"&gt;Message&lt;/label&gt;
  &lt;textarea name="message" id="message"&gt;&lt;/textarea&gt;

  &lt;button type="submit"&gt;Send&lt;/button&gt;
&lt;/form&gt;</code></pre>
            </div>

            <h3>Name Attribute</h3>
            <p>SubmitraX uses the <code>name</code> attribute of your input elements to identify the data. Make sure every input you want to capture has a unique <code>name</code>.</p>

            <div class="warning-card">
              <div class="card-icon"><AlertTriangle :size="20" /></div>
              <div class="card-body">
                <p>Inputs without a <code>name</code> attribute will not be captured.</p>
              </div>
            </div>
          </section>

          <!-- AJAX Submissions -->
          <section v-if="activeSection === 'ajax-submissions'" class="doc-section">
            <h1>AJAX Submissions</h1>
            <p>For a more seamless user experience, you can submit form data using AJAX. This allows you to handle the response without reloading the page.</p>

            <h3>Fetch API Example</h3>
            <p>Use the <code>fetch</code> API to dynamically send all fields from your form.</p>

            <div class="code-block">
              <div class="code-header">
                <span class="lang">Javascript</span>
              </div>
              <pre><code>const form = document.querySelector("#my-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("https://s.submitrax.com/YOUR_FORM_ID", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Success!", result);
      alert("Form submitted successfully!");
      form.reset();
    }
  } catch (error) {
    console.error("Submission failed", error);
  }
});</code></pre>
            </div>

            <h3>Axios Example</h3>
            <p>Axios makes it even simpler to send dynamic form data.</p>
            <div class="code-block">
              <div class="code-header">
                <span class="lang">Javascript</span>
              </div>
              <pre><code>const form = document.querySelector("#my-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  axios.post("https://s.submitrax.com/YOUR_FORM_ID", data)
    .then(response => {
      console.log(response.data);
      alert("Form submitted!");
      form.reset();
    })
    .catch(error => {
      console.error(error);
    });
});</code></pre>
            </div>

            <h3>Robust Data Collection</h3>
            <p>If your form contains multiple checkboxes with the same name or multi-select inputs, you should handle arrays properly.</p>

            <div class="code-block">
              <div class="code-header">
                <span class="lang">Javascript</span>
              </div>
              <pre><code>const formData = new FormData(form);
const data = {};

formData.forEach((value, key) => {
  if (!Reflect.has(data, key)) {
    data[key] = value;
    return;
  }
  if (!Array.isArray(data[key])) {
    data[key] = [data[key]];
  }
  data[key].push(value);
});

// Now 'data' contains arrays for multi-value fields</code></pre>
            </div>

            <h3>React Example</h3>
            <div class="code-block">
              <div class="code-header">
                <span class="lang">Javascript</span>
              </div>
              <pre><code>function ContactForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    
    await fetch("https://s.submitrax.com/YOUR_FORM_ID", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(data)
    });
    
    alert("Sent!");
  };

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;input name="name" /&gt;
      &lt;input name="email" type="email" /&gt;
      &lt;button type="submit"&gt;Submit&lt;/button&gt;
    &lt;/form&gt;
  );
}</code></pre>
            </div>

            <h3>jQuery Integration</h3>
            <div class="code-block">
              <div class="code-header">
                <span class="lang">Javascript</span>
              </div>
              <pre><code>$("#my-form").submit(function(e) {
  e.preventDefault();
  const form = $(this);
  
  $.ajax({
    type: "POST",
    url: "https://s.submitrax.com/YOUR_FORM_ID",
    data: form.serialize(), // Automatically serializes all form fields
    dataType: "json",
    success: function(data) {
      alert("Form submitted!");
    }
  });
});</code></pre>
            </div>
          </section>

          <!-- Form Validation -->
          <section v-if="activeSection === 'form-validation'" class="doc-section">
            <h1>Form Validation</h1>
            <p>SubmitraX supports basic server-side validation and works perfectly with browser-native validation.</p>

            <h3>Required Fields</h3>
            <p>Use the HTML5 <code>required</code> attribute on your inputs. SubmitraX will also respect these if you are using custom client-side validation.</p>

            <h3>Custom Validation Rules</h3>
            <p>You can configure specific validation rules in your form settings on the SubmitraX dashboard, such as allowed email domains or min/max lengths.</p>
          </section>

          <!-- Redirecting -->
          <section v-if="activeSection === 'redirecting'" class="doc-section">
            <h1>Redirecting</h1>
            <p>By default, SubmitraX shows a success page after a submission. You can customize this behavior.</p>

            <h3>Using _redirect</h3>
            <p>Add a hidden input field named <code>_redirect</code> to your form. SubmitraX will redirect the user to this URL after a successful submission.</p>

            <div class="code-block">
              <div class="code-header">
                <span class="lang">HTML</span>
              </div>
              <pre><code>&lt;input type="hidden" name="_redirect" value="https://yourwebsite.com/thanks"&gt;</code></pre>
            </div>

            <h3>AJAX Success</h3>
            <p>If you are using AJAX, you typically don't need a redirect as you can handle the success state in your code.</p>
          </section>

          <!-- Spam Protection -->
          <section v-if="activeSection === 'spam-protection'" class="doc-section">
            <h1>Spam Protection</h1>
            <p>SubmitraX uses multiple layers of defense to protect your forms from spam bots. Keeping your inbox clean is our top priority.</p>

            <h3>Honeypot</h3>
            <p>A honeypot is a simple but effective anti-spam technique used to trap bots.</p>
            <p><strong>How it works:</strong></p>
            <ol>
              <li><strong>The Trap:</strong> You add a hidden input field to your form (often named <code>_gotcha</code>) that is invisible to human users.</li>
              <li><strong>The Behavior:</strong> Real humans won't see this field, so they will leave it empty. However, spam bots often scan the HTML and blindly fill out every field they find.</li>
              <li><strong>The Catch:</strong> When the server receives the submission, it checks this hidden field. If it contains <strong>any value</strong>, the server knows it was filled by a bot and silently rejects or ignores the submission.</li>
            </ol>

            <div class="code-block">
              <div class="code-header">
                <span class="lang">HTML</span>
              </div>
              <pre><code>&lt;!-- This field is hidden from users --&gt;
&lt;input type="text" name="_gotcha" style="display:none"&gt;</code></pre>
            </div>

            <h3>reCAPTCHA</h3>
            <p>SubmitraX supports both Google reCAPTCHA v2 (Checkbox) and v3 (Score-based). You can choose the version that best fits your needs in the form settings.</p>
            
            <p><strong>To set up reCAPTCHA:</strong></p>
            <ol>
              <li>Enable reCAPTCHA in your form settings on the Dashboard.</li>
              <li>Select your preferred version (v2 or v3).</li>
              <li>Provide your Google reCAPTCHA <strong>Site Key</strong> and <strong>Secret Key</strong>.</li>
            </ol>

            <h4>reCAPTCHA v2 (Checkbox)</h4>
            <p>Add the script to your <code>&lt;head&gt;</code> and the widget to your <code>&lt;form&gt;</code>:</p>
            <div class="code-block">
              <div class="code-header"><span class="lang">HTML</span></div>
              <pre><code>&lt;script src="https://www.google.com/recaptcha/api.js" async defer&gt;&lt;/script&gt;
              
&lt;form action="..." method="POST"&gt;
  &lt;!-- your fields --&gt;
  &lt;div class="g-recaptcha" data-sitekey="YOUR_SITE_KEY"&gt;&lt;/div&gt;
  &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;</code></pre>
            </div>

            <h4>reCAPTCHA v3 (Score-based)</h4>
            <p>v3 is invisible and requires a bit of JavaScript. Load the library with your site key:</p>
            <div class="code-block">
              <div class="code-header"><span class="lang">HTML</span></div>
              <pre><code>&lt;script src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY"&gt;&lt;/script&gt;</code></pre>
            </div>
            
            <p>Then, execute reCAPTCHA when the form is submitted and append the token to your form:</p>
            <div class="code-block">
              <div class="code-header"><span class="lang">Javascript</span></div>
              <pre><code>grecaptcha.ready(function() {
  grecaptcha.execute('YOUR_SITE_KEY', {action: 'submit'}).then(function(token) {
    // Add the token to the form
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'g-recaptcha-response';
    input.value = token;
    document.getElementById('my-form').appendChild(input);
    
    // Submit the form
    document.getElementById('my-form').submit();
  });
});</code></pre>
            </div>

            <p>SubmitraX will verify the token and, for v3, compare the score against your configured threshold (default 0.5).</p>
          </section>

          <!-- Integrations -->
          <section v-if="activeSection === 'integrations'" class="doc-section">
            <h1>Integrations</h1>
            <p>Connect SubmitraX to the tools you already use. Move your data where it needs to be, automatically.</p>

            <h3>Slack</h3>
            <p>Receive form submissions directly in your Slack channels. Perfect for team collaboration and quick responses.</p>
            <ol>
              <li>Go to <a href="https://api.slack.com/apps" target="_blank">api.slack.com/apps</a> and create a new app.</li>
              <li>Select <strong>Incoming Webhooks</strong> and toggle it On.</li>
              <li>Click <strong>Add New Webhook to Workspace</strong> and select your desired channel.</li>
              <li>Copy the generated Webhook URL and paste it into the <strong>Webhook URL</strong> field in your SubmitraX form settings.</li>
            </ol>

            <h3>Discord</h3>
            <p>Pipe your submissions directly into a Discord channel using webhooks.</p>
            <ol>
              <li>Open your Discord server settings or channel settings.</li>
              <li>Go to <strong>Integrations</strong> > <strong>Webhooks</strong>.</li>
              <li>Create a new webhook and copy the URL.</li>
              <li>Paste the URL into the <strong>Webhook URL</strong> field in your SubmitraX form settings.</li>
            </ol>

            <div class="info-card">
              <div class="card-icon"><Plug :size="20" /></div>
              <div class="card-body">
                <h4>Zapier & Make</h4>
                <p>Use our Zapier integration to connect with over 5,000+ apps like Google Sheets, Trello, and Salesforce.</p>
              </div>
            </div>
          </section>

          <!-- Email Settings -->
          <section v-if="activeSection === 'email-settings'" class="doc-section">
            <h1>Email Settings</h1>
            <p>Control how and when you receive emails from SubmitraX.</p>

            <h3>Submission Notifications</h3>
            <p>By default, we send an email to your account email address for every submission. You can change this or add multiple recipients in the Dashboard.</p>

            <h3>Autoresponder</h3>
            <p>Send an automatic "Thank you" email to the person who submitted the form. You can customize the subject, body, and "from" name.</p>

            <div class="warning-card">
              <div class="card-icon"><Mail :size="20" /></div>
              <div class="card-body">
                <p>To use autoresponders, your form must include an input field with <code>name="email"</code>.</p>
              </div>
            </div>

            <h3>Custom Templates</h3>
            <p>Use our template editor to create beautiful, branded emails that match your company's identity.</p>
          </section>

          <!-- Webhooks -->
          <section v-if="activeSection === 'webhooks'" class="doc-section">
            <h1>Webhooks</h1>
            <p>Webhooks allow you to send form submission data to your own custom server or other 3rd party services instantly.</p>

            <h3>Configuration</h3>
            <p>Go to your form settings and add your webhook URL. SubmitraX will send a POST request with the submission data as a JSON payload whenever your form is submitted.</p>

            <h3>Payload Example</h3>
            <div class="code-block">
              <div class="code-header">
                <span class="lang">JSON</span>
              </div>
              <pre><code>{
  "form_id": "abcd1234",
  "submission_id": "sub_9876",
  "data": {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "Hello!"
  },
  "created_at": "2023-10-27T10:00:00Z"
}</code></pre>
            </div>
          </section>

          <!-- AI Form Generation -->
          <section v-if="activeSection === 'ai-generation'" class="doc-section">
            <h1>AI Form Generation</h1>
            <p class="lead">Accelerate your workflow with SubmitraX's built-in AI assistant. Generate clean, professional forms in seconds.</p>

            <div class="pro-badge-card">
              <div class="card-icon"><Wand2 :size="20" /></div>
              <div class="card-body">
                <h4>Pro Feature</h4>
                <p>AI Form Generation is available exclusively to <strong>Pro</strong> plan members. Upgrade in your account settings to unlock this feature.</p>
              </div>
            </div>

            <div class="info-card">
              <div class="card-icon"><Wand2 :size="20" /></div>
              <div class="card-body">
                <h4>Powerful & Flexible</h4>
                <p>Our AI can generate HTML using modern frameworks like <strong>Tailwind CSS</strong> or <strong>Bootstrap 5</strong>, ensuring your forms look great out of the box.</p>
              </div>
            </div>

            <h3>How to use AI Generation</h3>
            <p>You can access the AI generation tool directly from the <strong>How-to</strong> tab of any form in your dashboard.</p>
            <ol>
              <li>Select your form from the sidebar.</li>
              <li>Navigate to the <strong>How-to</strong> tab.</li>
              <li>In the <strong>Template</strong> dropdown, select "Create a template with AI".</li>
            </ol>

            <h3>Generation Options</h3>
            <p>Our AI assistant offers several ways to create your perfect form:</p>
            <ul>
              <li><strong>Framework Selection:</strong> Choose between Tailwind CSS (modern, utility-first) or Bootstrap 5 (robust, component-based).</li>
              <li><strong>Template Styles:</strong> Select from optimized blueprints like "Newsletter" or "Contact Form".</li>
              <li><strong>Define Yourself:</strong> Provide custom instructions to build complex forms tailored to your exact needs.</li>
              <li><strong>Import from URL:</strong> Point the AI to an existing website, and it will take inspiration from the design and fields to generate a compatible SubmitraX form.</li>
            </ul>

            <h3>Preview & Copy</h3>
            <p>Once generated, you can view a <strong>Live Preview</strong> of your form directly in the dashboard. If you're happy with the result, just click <strong>Copy Code</strong> to get the HTML with all necessary CDN links (fonts, CSS frameworks) included.</p>

            <div class="warning-card">
              <div class="card-icon"><AlertTriangle :size="20" /></div>
              <div class="card-body">
                <p>The AI generates a complete HTML snippet including the correct <code>action</code> attribute for your form. No manual configuration required!</p>
              </div>
            </div>
          </section>

          <!-- Custom Templates -->
          <section v-if="activeSection === 'custom-templates'" class="doc-section">
            <h1>Custom Templates</h1>
            <p class="lead">SubmitraX allows you to fully customize your form templates and save them for future use across all your forms.</p>

            <div class="info-card">
              <div class="card-icon"><Wand2 :size="20" /></div>
              <div class="card-body">
                <h4>Full Creative Control</h4>
                <p>Don't be limited by standard blueprints. Edit the HTML source directly to add custom fields, styling, or scripts.</p>
              </div>
            </div>

            <h3>Editing Template Source</h3>
            <p>Every template in the <strong>How-to</strong> tab, including those generated by AI, can be edited manually:</p>
            <ol>
              <li>Select any template from the dropdown (Standard, AI-generated, or an existing Custom template).</li>
              <li>Click the <strong>Edit Source</strong> button next to the markup header.</li>
              <li>Modify the HTML directly in the built-in editor.</li>
              <li>Click <strong>Cancel</strong> at any time to discard changes and revert to the original.</li>
            </ol>

            <h3>Saving Your Creations</h3>
            <p>Once you've made changes to a template, you can save it as a new reusable template:</p>
            <ul>
              <li>Enter a descriptive name in the <strong>Template name...</strong> field.</li>
              <li>Click <strong>Save Template</strong>.</li>
              <li>Your new template will now appear in the <strong>Custom Templates</strong> group within the template selector dropdown.</li>
            </ul>

            <div class="warning-card">
              <div class="card-icon"><AlertTriangle :size="20" /></div>
              <div class="card-body">
                <p>Custom templates are currently saved in your browser's local storage. They will be available whenever you use this browser to access SubmitraX.</p>
              </div>
            </div>
          </section>

          <!-- Dashboard -->
          <section v-if="activeSection === 'dashboard'" class="doc-section">
            <h1>Dashboard</h1>
            <p>The SubmitraX Dashboard is your central command for managing forms and submissions.</p>

            <h3>Overview</h3>
            <p>From the overview page, you can see all your forms and a summary of recent submissions. You can also create new forms or workspaces here.</p>

            <h3>Form Management</h3>
            <p>Clicking on a form takes you to its detail page, where you can:</p>
            <ul>
              <li><strong>View Submissions:</strong> See all data collected by your form in a clean table.</li>
              <li><strong>Export Data:</strong> Download your submissions in CSV or JSON format.</li>
              <li><strong>Settings:</strong> Configure notifications, redirects, and integrations.</li>
            </ul>
          </section>

          <!-- Exporting -->
          <section v-if="activeSection === 'exporting'" class="doc-section">
            <h1>Exporting Data</h1>
            <p>Your data is yours. We make it easy to export your submissions for analysis or backup.</p>

            <h3>CSV Export</h3>
            <p>Export your submissions as a CSV file to open in Excel or Google Sheets.</p>

            <h3>JSON Export</h3>
            <p>Export your submissions as a JSON file for easy processing in other applications or backups.</p>

            <div class="info-card">
              <div class="card-icon"><Filter :size="20" /></div>
              <div class="card-body">
                <h4>Filtering</h4>
                <p>You can filter your submissions by date or search terms before exporting to get exactly the data you need.</p>
              </div>
            </div>
          </section>

          <!-- API Reference -->
          <section v-if="activeSection === 'api-quickstart'" class="doc-section">
            <h1>API Quick Start</h1>
            <p class="lead">Welcome to the SubmitraX API documentation. Use our API to programmatically manage your forms, submissions, and workspaces.</p>
            
            <h3>Base URL</h3>
            <div class="code-block">
              <pre><code>https://s.submitrax.com/api</code></pre>
            </div>

            <h3>Authentication</h3>
            <p>All API requests must be authenticated using an API Token. You can generate an API Token in your <router-link to="/workspace/settings">Workspace Settings</router-link>.</p>
            <div class="code-block">
              <pre><code>Authorization: Bearer YOUR_API_TOKEN</code></pre>
            </div>

            <h3>Your First Request</h3>
            <p>Test your authentication by retrieving your workspace information:</p>
            <div class="code-block">
              <div class="code-header">
                <span class="lang">cURL</span>
              </div>
              <pre><code>curl -X GET https://s.submitrax.com/api/workspaces \
  -H "Authorization: Bearer YOUR_API_TOKEN"</code></pre>
            </div>
          </section>

          <!-- API Authentication -->
          <section v-if="activeSection === 'api-auth'" class="doc-section">
            <h1>API Authentication</h1>
            <p>SubmitraX uses API tokens to allow access to the API. You can register a new API token in your workspace settings.</p>
            
            <p>SubmitraX expects for the API token to be included in all API requests to the server in a header that looks like the following:</p>
            <div class="code-block">
              <pre><code>Authorization: Bearer YOUR_API_TOKEN</code></pre>
            </div>

            <div class="endpoint-card">
              <h3>Generate API Token</h3>
              <p class="endpoint-meta"><span class="method post">POST</span> <span class="url">/workspaces/:id/token</span></p>
              <p>Generates a new API token for the specified workspace. This will invalidate any previous tokens.</p>
              
              <h4>Response</h4>
              <div class="code-block">
<pre><code>{
  "api_token": "sk_a1b2c3d4e5f6..."
}</code></pre>
              </div>
            </div>
          </section>

          <!-- API Workspaces -->
          <section v-if="activeSection === 'api-workspaces'" class="doc-section">
            <h1>Workspaces</h1>
            <p>Workspaces are the top-level containers for your forms and members.</p>

            <div class="endpoint-card">
              <h3>List All Workspaces</h3>
              <p class="endpoint-meta"><span class="method get">GET</span> <span class="url">/workspaces</span></p>
              <p>Returns a list of workspaces you own or are a member of.</p>
              
              <h4>Response</h4>
              <div class="code-block">
<pre><code>[
  {
    "id": 1,
    "name": "My Company",
    "submission_quota": 1000,
    "submissions_used": 150,
    "forms": [...]
  }
]</code></pre>
              </div>
            </div>

            <div class="endpoint-card">
              <h3>Create Workspace</h3>
              <p class="endpoint-meta"><span class="method post">POST</span> <span class="url">/workspaces</span></p>
              <p>Create a new workspace.</p>
              
              <h4>Parameters</h4>
              <ul class="params-list">
                <li><code>name</code> (required): The name of the workspace.</li>
              </ul>

              <h4>Response</h4>
              <div class="code-block">
<pre><code>{
  "id": 2,
  "name": "New Project",
  "user_id": 1
}</code></pre>
              </div>
            </div>
          </section>

          <!-- API Members -->
          <section v-if="activeSection === 'api-members'" class="doc-section">
            <h1>Members</h1>
            <p>Manage team members within your workspaces.</p>

            <div class="endpoint-card">
              <h3>List Members</h3>
              <p class="endpoint-meta"><span class="method get">GET</span> <span class="url">/members/:workspaceId/members</span></p>
              <p>Get a list of all members in a workspace.</p>
              
              <h4>Response</h4>
              <div class="code-block">
<pre><code>[
  {
    "id": 1,
    "name": "Alice Smith",
    "email": "alice@example.com",
    "role": "admin",
    "status": "active"
  }
]</code></pre>
              </div>
            </div>

            <div class="endpoint-card">
              <h3>Invite Member</h3>
              <p class="endpoint-meta"><span class="method post">POST</span> <span class="url">/members/:workspaceId/members/invite</span></p>
              <p>Invite a new user to the workspace.</p>
              
              <h4>Parameters</h4>
              <ul class="params-list">
                <li><code>theirName</code> (required): Name of the invitee.</li>
                <li><code>theirEmail</code> (required): Email of the invitee.</li>
                <li><code>yourName</code> (required): Your name (to display in email).</li>
              </ul>
            </div>
          </section>

          <!-- API Forms -->
          <section v-if="activeSection === 'api-forms'" class="doc-section">
            <h1>Forms</h1>
            <p>Forms are the core object for collecting submissions.</p>

            <div class="endpoint-card">
              <h3>List Forms</h3>
              <p class="endpoint-meta"><span class="method get">GET</span> <span class="url">/forms</span></p>
              <p>Get all forms across all your workspaces.</p>
              
              <h4>Response</h4>
              <div class="code-block">
<pre><code>[
  {
    "id": 101,
    "name": "Contact Us",
    "form_key": "x1y2z3...",
    "workspace_id": 1
  }
]</code></pre>
              </div>
            </div>

            <div class="endpoint-card">
              <h3>Get Form</h3>
              <p class="endpoint-meta"><span class="method get">GET</span> <span class="url">/forms/:id</span></p>
              <p>Get details of a specific form.</p>
            </div>

            <div class="endpoint-card">
              <h3>Create Form</h3>
              <p class="endpoint-meta"><span class="method post">POST</span> <span class="url">/forms</span></p>
              
              <h4>Parameters</h4>
              <ul class="params-list">
                <li><code>name</code> (required): Form name.</li>
                <li><code>workspace_id</code> (required): ID of the workspace.</li>
                <li><code>email_to</code> (optional): Comma-separated emails.</li>
              </ul>
            </div>
          </section>

          <!-- API Submissions -->
          <section v-if="activeSection === 'api-submissions'" class="doc-section">
            <h1>API Submissions</h1>
            <p>Access and manage the data collected from your forms programmatically.</p>

            <div class="endpoint-card">
              <h3>List Submissions (Form)</h3>
              <p class="endpoint-meta"><span class="method get">GET</span> <span class="url">/submissions/form/:formId</span></p>
              <p>Get all submissions for a specific form.</p>
               
              <h4>Response</h4>
              <div class="code-block">
<pre><code>[
  {
    "id": 55,
    "data": { "email": "user@example.com", "message": "Hi!" },
    "created_at": "2023-01-01T12:00:00Z"
  }
]</code></pre>
              </div>
            </div>
          </section>

          <!-- API Exports -->
          <section v-if="activeSection === 'api-exports'" class="doc-section">
            <h1>API Exports</h1>
            <p>Generate exports for your submission data via API.</p>

            <div class="endpoint-card">
              <h3>Create Export</h3>
              <p class="endpoint-meta"><span class="method post">POST</span> <span class="url">/exports/form/:formId</span></p>
              
              <h4>Parameters</h4>
              <ul class="params-list">
                <li><code>format</code> (required): 'csv' or 'json'.</li>
                <li><code>start_date</code> (optional): YYYY-MM-DD.</li>
                <li><code>end_date</code> (optional): YYYY-MM-DD.</li>
              </ul>
              
               <h4>Response</h4>
              <div class="code-block">
<pre><code>{
  "url": "/api/exports/export-abc123.csv",
  "filename": "export-abc123.csv",
  "status": "completed"
}</code></pre>
              </div>
            </div>
          </section>
        </div>

        <footer class="content-footer">
          <div class="footer-nav">
            <template v-if="prevPage">
               <a href="#" @click.prevent="setActiveSection(prevPage.id)" class="page-link prev">
                 <span class="arrow"><ArrowLeft :size="16" /></span>
                 <div class="link-label">
                   <span class="dir">Previous</span>
                   <span class="title">{{ prevPage.label }}</span>
                 </div>
               </a>
            </template>
            <div v-else></div>

            <template v-if="nextPage">
              <a href="#" @click.prevent="setActiveSection(nextPage.id)" class="page-link next">
                <div class="link-label">
                  <span class="dir">Next</span>
                  <span class="title">{{ nextPage.label }}</span>
                </div>
                <span class="arrow"><ArrowRight :size="16" /></span>
              </a>
            </template>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2025 SubmitraX Documentation. Built for developers.</p>
          </div>
        </footer>
      </main>
    </div>
  </div>
</template>

<script>
import { X, Menu, Lightbulb, Mail, Shield, Plug, BarChart2, AlertTriangle, Filter, ArrowLeft, ArrowRight, Wand2 } from 'lucide-vue-next'

export default {
  name: 'Documentation',
  components: {
    X,
    Menu,
    Lightbulb,
    Mail,
    Shield,
    Plug,
    BarChart2,
    AlertTriangle,
    Filter,
    ArrowLeft,
    ArrowRight,
    Wand2
  },
  data() {
    return {
      activeSection: 'introduction',
      mobileMenuOpen: false,
      isLoggedIn: false,
      navigation: [
        {
          title: 'Getting Started',
          items: [
            { id: 'introduction', label: 'Introduction' },
            { id: 'setup', label: 'Setup' },
          ]
        },
        {
          title: 'HTML Forms',
          items: [
            { id: 'html-form', label: 'HTML Basics' },
            { id: 'form-validation', label: 'Form Validation' },
            { id: 'spam-protection', label: 'Spam Protection' },
          ]
        },
        {
          title: 'Submissions',
          items: [
            { id: 'ajax-submissions', label: 'AJAX Submissions' },
            { id: 'redirecting', label: 'Redirecting' },
            { id: 'exporting', label: 'Exporting Data' },
          ]
        },
        {
          title: 'Advanced',
          items: [
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'email-settings', label: 'Email Settings' },
            { id: 'integrations', label: 'Integrations' },
            { id: 'webhooks', label: 'Webhooks' },
            { id: 'ai-generation', label: 'AI Form Generation' },
            { id: 'custom-templates', label: 'Custom Templates' },
          ]
        },
        {
          title: 'Management API',
          items: [
            { id: 'api-quickstart', label: 'API Quick Start' },
            { id: 'api-auth', label: 'API Authentication' },
            { id: 'api-workspaces', label: 'Workspaces' },
            { id: 'api-members', label: 'Members' },
            { id: 'api-forms', label: 'Forms' },
            { id: 'api-submissions', label: 'Submissions' },
            { id: 'api-exports', label: 'Exports' },
          ]
        }
      ]
    }
  },
  computed: {
    activeCategoryLabel() {
      for (const group of this.navigation) {
        const item = group.items.find(i => i.id === this.activeSection);
        if (item) return item.label;
      }
      return '';
    },
    allPages() {
      const pages = [];
      this.navigation.forEach(group => {
        group.items.forEach(item => {
          pages.push(item);
        });
      });
      return pages;
    },
    prevPage() {
      const currentIndex = this.allPages.findIndex(p => p.id === this.activeSection);
      return currentIndex > 0 ? this.allPages[currentIndex - 1] : null;
    },
    nextPage() {
      const currentIndex = this.allPages.findIndex(p => p.id === this.activeSection);
      return currentIndex < this.allPages.length - 1 ? this.allPages[currentIndex + 1] : null;
    }
  },
  mounted() {
    this.isLoggedIn = !!localStorage.getItem('token');
    const hash = window.location.hash.replace('#', '');
    if (hash && this.allPages.find(p => p.id === hash)) {
      this.activeSection = hash;
    }
  },
  methods: {
    setActiveSection(sectionId) {
      this.activeSection = sectionId;
      window.location.hash = sectionId;
      this.mobileMenuOpen = false;
      document.querySelector('.content-area').scrollTop = 0;
    },
    copyText(text) {
      navigator.clipboard.writeText(text);
      // Could add a toast here
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

.docs-layout {
  display: flex;
  min-height: 100vh;
  background: #ffffff;
  color: #1a1a1a;
  font-family: 'Inter', -apple-system, sans-serif;
}

/* Sidebar */
.docs-sidebar {
  width: 280px;
  border-right: 1px solid #f0f0f0;
  height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  background: #fafafa;
  z-index: 100;
}

.sidebar-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.brand-text {
  font-weight: 700;
  font-size: 1.25rem;
  color: #111;
}

.docs-badge {
  background: #eef2ff;
  color: #4f46e5;
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
}

.nav-group {
  margin-bottom: 2rem;
}

.group-title {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #8c8c8c;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.group-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  display: block;
  padding: 0.5rem 0;
  color: #4b5563;
  text-decoration: none;
  font-size: 0.9375rem;
  transition: all 0.2s;
  border-left: 2px solid transparent;
}

.nav-item:hover {
  color: #111;
}

.nav-item.active {
  color: #4f46e5;
  font-weight: 500;
}

/* Main Content Area */
.docs-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.docs-header {
  height: 64px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 90;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.separator {
  color: #d1d5db;
}

.current-page {
  color: #111;
  font-weight: 500;
}

.btn-login, .btn-dashboard {
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  color: #fff;
  background: #111;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: opacity 0.2s;
}

.content-area {
  flex: 1;
  overflow-y: auto;
  padding: 4rem 2rem;
}

.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

/* Typography & Section Styles */
.doc-section h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.doc-section h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 3rem;
  margin-bottom: 1rem;
  color: #111;
}

.doc-section p {
  line-height: 1.7;
  color: #4b5563;
  margin-bottom: 1.5rem;
  font-size: 1.0625rem;
}

.lead {
  font-size: 1.25rem !important;
  color: #6b7280 !important;
}

code {
  font-family: 'JetBrains Mono', monospace;
  background: #f3f4f6;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
  color: #dc2626;
}

/* Code Blocks */
.code-block {
  background: #0f172a;
  border-radius: 12px;
  margin: 2rem 0;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.lang {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 600;
  text-transform: uppercase;
}

.copy-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #94a3b8;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.code-block pre {
  padding: 1.5rem;
  margin: 0;
  overflow-x: auto;
}

.code-block code {
  background: transparent;
  padding: 0;
  color: #e2e8f0;
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Cards */
.info-card, .warning-card {
  display: flex;
  gap: 1.25rem;
  padding: 1.5rem;
  border-radius: 12px;
  margin: 2rem 0;
}

.info-card {
  background: #eff6ff;
  border: 1px solid #dbeafe;
}

.warning-card {
  background: #fffbeb;
  border: 1px solid #fef3c7;
}

.card-icon {
  font-size: 1.5rem;
}

.card-body h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.0625rem;
  font-weight: 700;
}

.card-body p {
  margin: 0;
  font-size: 0.9375rem;
}

/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-item {
  display: flex;
  gap: 1rem;
}

.feature-item .icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.feature-item strong {
  display: block;
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.feature-item p {
  font-size: 0.875rem !important;
  margin: 0;
}

/* API Documentation Styles */
.endpoint-card {
  background: white;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.endpoint-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f8fafc;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-family: 'JetBrains Mono', monospace;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;
  font-size: 0.875rem;
}

.method {
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  color: white;
  text-transform: uppercase;
}

.method.get { background-color: #3b82f6; }
.method.post { background-color: #10b981; }
.method.put { background-color: #f59e0b; }
.method.delete { background-color: #ef4444; }

.url {
  color: #1e293b;
  font-weight: 600;
}

.params-list {
  list-style: disc;
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
}

.params-list li {
  margin-bottom: 0.5rem;
  color: #4b5563;
  font-size: 0.9375rem;
}

.params-list code {
  background: #f3f4f6;
  padding: 2px 5px;
  border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
  color: #4f46e5;
  font-size: 0.875rem;
}

/* Footer Navigation */
.content-footer {
  margin-top: 6rem;
  padding-top: 3rem;
  border-top: 1px solid #f0f0f0;
}

.footer-nav {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

.page-link {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s;
}

.page-link:hover {
  border-color: #4f46e5;
  background: #fafafa;
}

.page-link.next {
  justify-content: flex-end;
}

.link-label {
  display: flex;
  flex-direction: column;
}

.page-link.next .link-label {
  align-items: flex-end;
  text-align: right;
}

.dir {
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
}

.title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #111;
}

.arrow {
  font-size: 1.25rem;
  color: #4f46e5;
}

.footer-bottom {
  text-align: center;
  margin-top: 4rem;
  color: #9ca3af;
  font-size: 0.875rem;
}

/* Mobile Controls */
.mobile-toggle {
  display: none;
  background: transparent;
  border: none;
  color: #6b7280;
  cursor: pointer;
}

.mobile-close {
  display: none;
  font-size: 2rem;
  background: transparent;
  border: none;
  line-height: 1;
}

@media (max-width: 1024px) {
  .docs-sidebar {
    position: fixed;
    left: -280px;
    transition: left 0.3s ease;
  }

  .docs-sidebar.mobile-open {
    left: 0;
  }

  .mobile-toggle, .mobile-close {
    display: block;
  }

  .content-area {
    padding: 2rem 1.5rem;
  }
}

.pro-badge-card {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  border-left: 4px solid #4f46e5;
  margin-bottom: 2rem;
}

.pro-badge-card .card-icon {
  width: 3rem;
  height: 3rem;
  background: #e0e7ff;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4f46e5;
  flex-shrink: 0;
}

.pro-badge-card h4 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.pro-badge-card p {
  color: #6b7280;
  margin: 0;
}
</style>
