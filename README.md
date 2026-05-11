# n8n-nodes-submitrax

This is an n8n community node that lets you use [SubmitraX](https://submitrax.com) in your n8n workflows.

**SubmitraX** is a powerful form backend for modern developers. Connect your forms to the API and handle submissions, emails, integrations, and spam protection — no server-side code required.

> [!TIP]
> **✅ n8n Community Node**
> This node is verified and compatible with n8n's community node system. Install it directly from within n8n or via npm.

---

## 📦 Installation

### In n8n (recommended)
1. Open your n8n instance
2. Go to **Settings → Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-submitrax`
5. Click **Install**

### Via npm (self-hosted)
```bash
npm install n8n-nodes-submitrax
```

---

## 🔑 Credentials
Before using the node, you need a SubmitraX API token.

1. Log in to [submitrax.com](https://submitrax.com)
2. Go to **Workspace → Settings**
3. Generate an **API Token**
4. In n8n, create a new **SubmitraX API** credential and paste the token

```http
Authorization: Bearer YOUR_API_TOKEN
```

---

## 🚀 Resources & Operations
The node supports the following resources and operations:

| Resource | Operations |
| :--- | :--- |
| **Workspace** | Get Many, Create |
| **Form** | Get Many, Get, Create |
| **Submission** | Get Many, Create |
| **Member** | Get Many, Invite |
| **Export** | Create |

---

## 💡 Usage Examples

### Get all form submissions
- **Resource**: Submission
- **Operation**: Get Many
- **Form ID**: `your-form-id`

### Create a new submission
- **Resource**: Submission
- **Operation**: Create
- **Form ID**: `your-form-id`
- **Data (JSON)**:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "Hello from n8n!"
}
```

### Export submissions as CSV
- **Resource**: Export
- **Operation**: Create
- **Form ID**: `your-form-id`
- **Format**: CSV
- **Start Date**: `2024-01-01`
- **End Date**: `2024-12-31`

### Invite a team member
- **Resource**: Member
- **Operation**: Invite
- **Workspace ID**: `1`
- **Their Name**: Alice Smith
- **Their Email**: `alice@example.com`
- **Your Name**: Bob Jones

---

## 🔗 API Reference
All requests go to the base URL: `https://s.submitrax.com/api`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/workspaces` | List all workspaces |
| `POST` | `/workspaces` | Create workspace |
| `GET` | `/forms` | List all forms |
| `GET` | `/forms/:id` | Get specific form |
| `POST` | `/forms` | Create form |
| `GET` | `/submissions/form/:formId` | List submissions |
| `POST` | `/:formId` | Create submission |
| `GET` | `/members/:workspaceId/members` | List members |
| `POST` | `/members/:workspaceId/members/invite` | Invite member |
| `POST` | `/exports/form/:formId` | Create export |

---

## 🛡️ Compatibility

> [!IMPORTANT]
> **Requirements**
> This node requires n8n version `>=0.187.0`. It uses the n8n community node API v1.

- n8n community node package (`n8nNodesApiVersion: 1`)
- Peer dependency: `n8n-workflow`
- TypeScript source included

---

## 📄 License
MIT — Copyright © 2024 [Submitrax](https://submitrax.com)
