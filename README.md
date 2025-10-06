# TravelTrust Project Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher (tested with v22.16.0)
- **PHP**: 8.1 or higher (tested with PHP 8.2.12)
- **Composer**: Latest version
- **MySQL/MariaDB**: 5.7+ or 10.3+
- **Git**: For version control

## Project Structure

```
traveltrust/
├── frontend/          # Next.js frontend application
├── backend-ci4/       # CodeIgniter 4 backend API
└── SETUP.md          # This file
```

---

## Backend Setup (CodeIgniter 4)

### 1. Navigate to Backend Directory

```bash
cd backend-ci4
```

### 2. Install Dependencies

```bash
composer install
```

### 3. Configure Environment

Copy the example environment file:

```bash
cp .env.example .env
```

Edit the `.env` file and configure your database settings:

```env
#--------------------------------------------------------------------
# ENVIRONMENT
#--------------------------------------------------------------------
CI_ENVIRONMENT = development

#--------------------------------------------------------------------
# APP
#--------------------------------------------------------------------
app.baseURL = 'http://localhost:8080/'
app.indexPage = ''
app.appTimezone = 'Asia/Kathmandu'

#--------------------------------------------------------------------
# DATABASE
#--------------------------------------------------------------------
database.default.hostname = localhost
database.default.database = traveltrust_db
database.default.username = root
database.default.password = your_password_here
database.default.DBDriver = MySQLi
database.default.DBPrefix =
database.default.port = 3306

#--------------------------------------------------------------------
# SESSION
#--------------------------------------------------------------------
session.driver = 'CodeIgniter\Session\Handlers\FileHandler'
session.cookieName = 'traveltrust_session'
session.expiration = 7200
session.savePath = NULL
session.matchIP = false
session.timeToUpdate = 300
session.regenerateDestroy = false
```

### 4. Create Database

Create a MySQL database named `traveltrust_db`:

```sql
CREATE DATABASE traveltrust_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 5. Run Migrations

```bash
php spark migrate
```

This will create all necessary database tables including:
- `users` - Admin user accounts
- `settings` - Site settings
- `destinations` - Travel destinations
- `testimonials` - Client testimonials
- `members` - Team members
- `partners` - Partner organizations
- `bookings` - Travel bookings
- `inquiries` - Contact inquiries
- `newsletter` - Newsletter subscriptions
- `offers` - Special offers

### 6. Seed Database

Run the database seeder to populate initial data:

```bash
php spark db:seed UnifiedSeeder
```

Or seed only the admin user:

```bash
php spark db:seed AdminSeeder
```

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`
- Email: `admin@traveltrust.com`

### 7. Start Backend Server

```bash
php spark serve --host=localhost --port=8080
```

The backend API will be available at: `http://localhost:8080`

---

## Frontend Setup (Next.js)

### 1. Navigate to Frontend Directory

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

The environment file is already configured at `.env.local`:

```env
# API URL for development
NEXT_PUBLIC_API_URL=http://localhost:8080/

# Build optimizations
NEXT_TELEMETRY_DISABLED=1
```

If deploying to production, update `.env.production` with your production API URL.

### 4. Start Development Server

```bash
npm run dev
```

The frontend will be available at: `http://localhost:3000`

### 5. Build for Production

```bash
npm run build
npm start
```

---

## Accessing the Application

### Public Website
- URL: `http://localhost:3000`
- Features:
  - Home page with hero section
  - Destinations listing
  - Team members
  - Testimonials
  - Partners
  - Contact form
  - Newsletter subscription
  - Booking form

### Admin Panel
- URL: `http://localhost:3000/admin/login`
- Default credentials:
  - Username: `admin`
  - Password: `admin123`

- Admin features:
  - Dashboard
  - Manage settings
  - Manage offers
  - Manage destinations
  - Manage team members
  - Manage testimonials
  - Manage partners
  - View bookings
  - View inquiries
  - View newsletter subscribers
  - Change password

---

## API Endpoints

The backend provides the following main API endpoints:

### Public Endpoints
- `GET /settings` - Get site settings
- `GET /destinations` - Get all destinations
- `GET /destinations/{id}` - Get specific destination
- `GET /testimonials` - Get all testimonials
- `GET /members` - Get team members
- `GET /partners` - Get partners
- `GET /offers` - Get special offers
- `POST /bookings` - Submit a booking
- `POST /inquiries` - Submit an inquiry
- `POST /newsletter/subscribe` - Subscribe to newsletter

### Admin Endpoints (Require Authentication)
- `POST /auth/login` - Admin login
- `POST /auth/logout` - Admin logout
- `POST /auth/change-password` - Change admin password
- CRUD operations for all resources (destinations, testimonials, etc.)

---

## Common Issues & Troubleshooting

### Backend Issues

**Issue: Database connection error**
- Ensure MySQL is running
- Check database credentials in `.env`
- Verify database `traveltrust_db` exists

**Issue: Migration fails**
- Check PHP version (requires 8.1+)
- Ensure database user has proper permissions
- Try: `php spark migrate:refresh`

**Issue: CORS errors**
- Check `app/Config/Cors.php` configuration
- Ensure frontend URL is allowed in CORS settings

### Frontend Issues

**Issue: API connection error**
- Ensure backend is running on port 8080
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify backend CORS settings

**Issue: Build fails**
- Clear Next.js cache: `npm run clean`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

---

## Development Workflow

1. **Backend Development:**
   - Run `php spark serve` in `backend-ci4` directory
   - API available at `http://localhost:8080`

2. **Frontend Development:**
   - Run `npm run dev` in `frontend` directory
   - App available at `http://localhost:3000`

3. **Database Changes:**
   - Create migration: `php spark make:migration MigrationName`
   - Run migrations: `php spark migrate`
   - Rollback: `php spark migrate:rollback`

4. **Seeding Data:**
   - Create seeder: `php spark make:seeder SeederName`
   - Run seeder: `php spark db:seed SeederName`

---

## Production Deployment

### Backend (CodeIgniter 4)

1. Set `CI_ENVIRONMENT = production` in `.env`
2. Update `app.baseURL` to your production domain
3. Configure production database credentials
4. Ensure writable directory has proper permissions
5. Point web server to `public` directory
6. Enable HTTPS and update CORS settings

### Frontend (Next.js)

1. Update `NEXT_PUBLIC_API_URL` in `.env.production`
2. Run `npm run build`
3. Deploy using:
   - Vercel (recommended for Next.js)
   - Custom server with `npm start`
   - Static export (if applicable)

---

## Security Notes

- **Change default admin password immediately after first login**
- Never commit `.env` files to version control
- Use strong passwords for database and admin accounts
- Enable HTTPS in production
- Keep dependencies updated regularly
- Review and configure CORS settings appropriately

---

## Support

For issues or questions:
- Check the documentation in each directory
- Review error logs in `backend-ci4/writable/logs/`
- Check browser console for frontend errors

---

## License

MIT
