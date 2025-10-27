# My Portfolio Website

A small single-page site built with [Next.js](https://nextjs.org), with content management via a headless Strapi backend.


## Project Structure

```markdown
src/                    # Next js frontend
│   ├── components/         # components
│   ├── pages/             # pages
│   └── styles/            # styling
├── strapi-cms/            # Strapi CMS backend
│   ├── src/api/           # CMS content types, structure and API endpoints
│   └── config/            # CMS config
└── public/                # static assets
```

## Prerequisites

- **Node.js**: v22 LTS is recommended


## Running the Strapi CMS

1. **Navigate to the strapi-cms directory**
   ```bash
   cd strapi-cms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Set up the CMS env file**

    Create an .env file in the strapi-cms directory (copy from .env.example) and add variables such as:
   ```
   DATABASE_CLIENT=sqlite
   DATABASE_FILENAME=.tmp/data.db
   NEXT_PUBLIC_CMS_URL=http://localhost:1337
   ```
4. **Run Strapi**
   ```bash
   npm run dev
   ```
-  The CMS admin panel will be available at the URL set in your env, e.g. http://localhost:1337/admin
-  The REST API endpoints will be at `/api`, e.g. http://localhost:1337/api
- The CMS schema and the API endpoints will be set up automatically, but content may need to be filled in.

## Running the project

1. **Navigate to the root directory**
   ```bash
   cd ..
   ```
   
2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the frontend environment variables file**
Create a .env file (copy from .env.example) and add the variable for accessing the backend API set up earlier:
   ```bash
   NEXT_PUBLIC_CMS_URL=http://localhost:1337
   ```

4. **Run the development server - both frontend and backend together**
   ```bash
   npm run dev-with-strapi
   ```

5. **Open in browser**  
   Visit your local domains, such as [http://localhost:3000](http://localhost:3000) to view the site.

## Content Management

1. Access the CMS admin panel at your admin URL, like `http://localhost:1337/admin`
2. Create an admin account on first visit.
3. Fill out the schema with content for:
   - Homepage
   - About page 
   - Projects
   - Navigation links

## 📄 License

MIT
