PROJECT NAME: KickGuild

Create a complete modern social communication platform called KickGuild, inspired by Discord and X (Twitter), but with its own terminology and identity.

TECH STACK

Backend:

- Node.js
- Express.js
- MySQL
- JWT Authentication
- REST API

Frontend:

- Modern responsive web interface
- Mobile-first design
- Dark theme by default
- Purple and black visual identity
- Component-based architecture

Database:

- MySQL

GENERAL CONCEPT

KickGuild combines community groups and social posting.

Instead of Servers, the platform uses Clusters.

Instead of Channels, the platform uses Noêmias.

The platform must be designed from the beginning for future expansion, but the first version should focus on text-based communication.

CORE FEATURES

USER SYSTEM

Users can:

- Register with email and password
- Login securely
- Logout
- Recover password
- Change password
- Edit profile

Profile contains:

- Username
- Unique @handle
- Email
- Profile picture
- Biography
- Badges
- Join date
- Friend count
- Cluster count

AUTHENTICATION

Implement:

- JWT authentication
- Refresh tokens
- Password hashing using bcrypt
- Session management
- Rate limiting
- Protection against brute-force attacks

SOCIAL TIMELINE

The home page contains a public social feed.

Users can:

- Publish text posts
- Like posts
- React with emojis
- Comment on posts
- Share posts
- Delete own posts
- Edit own posts

Feed should support:

- Recent posts
- Trending posts
- Friends posts

FRIEND SYSTEM

Users can:

- Send friend requests
- Accept requests
- Reject requests
- Remove friends
- View friends list

CLUSTERS

Clusters are community spaces.

Cluster features:

- Name
- Description
- Icon
- Banner
- Owner
- Creation date
- Member count

Cluster permissions:

- Owner
- Administrator
- Moderator
- Member

Custom roles must be supported.

NOÊMIAS

Noêmias are communication spaces inside Clusters.

Each Cluster may contain multiple Noêmias.

Initial version:

- Text only

Future-ready architecture:

- Images
- Videos
- Files
- Voice channels

Noêmia settings:

- Name
- Description
- Permissions
- Visibility

MESSAGES

Users can:

- Send messages
- Edit messages
- Delete messages
- Reply to messages
- React with emojis

PRIVATE MESSAGES

Users can communicate through direct messages.

DM features:

- One-to-one conversations
- Message history
- Emoji reactions
- Online status

BADGE SYSTEM

Administrators can create badges.

Examples:

- Founder
- Verified
- Moderator
- Early Supporter
- Developer

Badges appear on user profiles.

ADMIN PANEL

Global administration panel.

Features:

- Manage users
- Ban users
- Suspend users
- Delete posts
- Delete clusters
- Manage badges
- View reports
- View statistics

SEARCH SYSTEM

Search functionality for:

- Users
- Clusters
- Posts
- Noêmias

NOTIFICATION SYSTEM

Notifications for:

- Friend requests
- Accepted requests
- Mentions
- Comments
- Reactions
- Cluster invitations

INVITATION SYSTEM

Clusters can be joined through:

- Public discovery
- Invitation links

Invite links should support:

- Expiration
- Usage limits

PERMISSION SYSTEM

Permissions should be highly modular.

Examples:

- Create Noêmias
- Delete messages
- Kick members
- Ban members
- Manage roles
- Manage Cluster

DATABASE DESIGN

Create complete relational MySQL schema.

Tables should include:

- users
- profiles
- badges
- user_badges
- friendships
- friend_requests
- posts
- comments
- reactions
- clusters
- cluster_members
- roles
- permissions
- role_permissions
- noemias
- messages
- direct_messages
- notifications
- invites
- reports

API DESIGN

Create complete REST API.

Examples:

Authentication:
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout

Users:
GET /api/users/:id
PUT /api/users/profile

Posts:
GET /api/posts
POST /api/posts

Clusters:
GET /api/clusters
POST /api/clusters

Noêmias:
GET /api/noemias
POST /api/noemias

Messages:
GET /api/messages
POST /api/messages

SCALABILITY

Architecture must be prepared for:

- Millions of users
- Horizontal scaling
- Redis caching
- WebSockets
- Future microservices

FUTURE FEATURES (NOT IMPLEMENTED YET)

- Voice chat
- Video chat
- Live streaming
- Communities
- Marketplace
- Bots
- AI assistants
- Mobile apps
- Desktop apps
- End-to-end encryption

UI REQUIREMENTS

Modern interface inspired by:

- Discord navigation
- X social feed
- Custom KickGuild identity

Main sections:

- Home Feed
- Friends
- Clusters
- Direct Messages
- Notifications
- Profile
- Settings

The generated code must be production-ready, organized, documented, secure, scalable, and follow best practices for Node.js and MySQL development.
