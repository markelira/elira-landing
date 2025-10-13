# How to Create a New Blog Post

## 📋 Required Information

Gather these details before adding a post:

### 1. **Slug** (URL identifier)
- Must be unique
- Use lowercase, Hungarian characters OK
- Use hyphens for spaces
- Example: `"hogyan-epitsd-marketing-strategiat"`

### 2. **Title** (Headline)
- Compelling, benefit-focused
- 50-70 characters ideal for SEO
- Hungarian language
- Example: `"Hogyan építs működő marketing stratégiát 2025-ben"`

### 3. **Excerpt** (Preview text)
- 2-3 sentences
- Summarize the value
- Shown on cards and in search
- Example: `"Lépésről lépésre bemutatjuk, hogyan építs olyan marketing stratégiát, amely igazán működik és mérhető eredményeket hoz a cégednek."`

### 4. **Category**
Choose ONE from:
- `Marketing` - Digital marketing, campaigns, channels
- `Strategy` - Business strategy, planning, frameworks
- `Analytics` - Data analysis, metrics, measurement
- `Growth` - Growth hacking, scaling, optimization
- `Leadership` - Management, team building, decision-making

### 5. **Author**
Use existing author key or create new one:
- `'marton-marques'` - Marketing Stratégia Szakértő
- `'eszter-kovacs'` - Growth Marketing Vezető
- `'adam-nagy'` - Analytics & Data Scientist

### 6. **Published Date**
- Format: `YYYY-MM-DD`
- Example: `'2025-01-20'`

### 7. **Read Time**
- Calculate: ~200 words per minute
- Format: `"8 perc olvasás"`

### 8. **Featured Image**
- **Option A**: Use Unsplash (free)
  - Go to https://unsplash.com
  - Find relevant image
  - Right-click image → Copy Image Address
  - Add `?w=1200&h=800&fit=crop` to URL
  - Example: `https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop`

- **Option B**: Use your own image
  - Upload to `/public/blog/`
  - Reference as: `'/blog/your-image-name.jpg'`
  - Recommended size: 1200x800px (16:9 aspect ratio)

### 9. **Featured** (optional)
- Set `true` for ONE post only (shows large on homepage)
- Set `false` or omit for regular posts

---

## 🔧 Step-by-Step: Adding a Post

### Step 1: Open the data file
```bash
# File location
/Users/marquese/elira-landing/lib/blog-data/sample-posts.ts
```

### Step 2: Copy this template

```typescript
{
  slug: 'your-post-slug-here',
  title: 'Your Post Title Here',
  excerpt: 'Brief description that explains what readers will learn. Make it compelling and benefit-focused.',
  category: 'Marketing', // or Strategy, Analytics, Growth, Leadership
  author: sampleAuthors['marton-marques'], // or eszter-kovacs, adam-nagy
  publishedAt: '2025-01-20',
  readTime: '8 perc olvasás',
  featuredImage: 'https://images.unsplash.com/photo-XXXXXX?w=1200&h=800&fit=crop',
  featured: false, // Set true for featured post
}
```

### Step 3: Add to the array

Add your post object to the `samplePosts` array:

```typescript
export const samplePosts: Post[] = [
  // Existing posts...
  {
    slug: 'data-driven-leadership',
    title: 'Adatvezérelt vezetés...',
    // ... existing post
  },

  // YOUR NEW POST HERE
  {
    slug: 'hogyan-epitsd-email-kampanyt',
    title: 'Hogyan építs konvertáló email kampányt',
    excerpt: 'Az email marketing még mindig az egyik legerősebb csatorna. Tanuld meg, hogyan írj olyan emaileket, amelyeket tényleg megnyitnak és rájuk kattintanak.',
    category: 'Marketing',
    author: sampleAuthors['marton-marques'],
    publishedAt: '2025-01-20',
    readTime: '10 perc olvasás',
    featuredImage: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=1200&h=800&fit=crop',
    featured: false,
  },
];
```

### Step 4: Save the file

The post will automatically appear on:
- `/blog` - Blog index page
- `/blog/your-post-slug-here` - Individual post page
- `/blog/category/marketing` - Category page

---

## 🖼️ Finding Great Images

### Unsplash Search Terms (in English)
- Marketing: "digital marketing", "analytics dashboard", "strategy meeting"
- Strategy: "planning", "whiteboard", "business strategy"
- Analytics: "data visualization", "charts graphs", "analytics"
- Growth: "growth chart", "rocket launch", "scaling"
- Leadership: "team meeting", "leadership", "coaching"

### Unsplash URL Format
```
https://images.unsplash.com/photo-[PHOTO-ID]?w=1200&h=800&fit=crop
```

---

## 👤 Creating a New Author

If you need a new author, add to `sampleAuthors` object:

```typescript
export const sampleAuthors: Record<string, Author> = {
  // Existing authors...

  'your-author-key': {
    name: 'Teljes Név',
    title: 'Pozíció vagy Szakértelem',
    bio: 'Rövid bemutatkozás 1-2 mondatban. Mi a szakterületed és hogyan segítesz?',
    linkedin: 'https://www.linkedin.com/in/yourprofile', // optional
    twitter: 'https://twitter.com/yourhandle', // optional
  },
};
```

Then use: `author: sampleAuthors['your-author-key']`

---

## ✅ Post Checklist

Before publishing, verify:
- [ ] Slug is unique and URL-friendly
- [ ] Title is compelling and under 70 characters
- [ ] Excerpt is 2-3 sentences
- [ ] Category is one of the 5 options
- [ ] Author exists in sampleAuthors
- [ ] Date format is YYYY-MM-DD
- [ ] Featured image is 16:9 ratio
- [ ] Only ONE post has `featured: true`
- [ ] Read time is reasonable (5-15 mins)

---

## 🎨 Category Colors Reference

The system automatically styles categories:

- **Marketing**: Blue gradient
- **Strategy**: Purple gradient
- **Analytics**: Green gradient
- **Growth**: Orange gradient
- **Leadership**: Indigo gradient

---

## 📱 Preview Your Post

After adding, run:
```bash
npm run dev
```

Then visit:
- `http://localhost:3000/blog` - See it in the grid
- `http://localhost:3000/blog/your-post-slug` - View the post page

---

## 🔄 Quick Example: Complete New Post

```typescript
{
  slug: 'google-ads-optimalizalas-magyar-piac',
  title: 'Google Ads optimalizálás magyar piacon: 7 tipp',
  excerpt: 'A Google Ads kampányok optimalizálása más a magyar piacon. Fedezd fel, hogyan érhetsz el jobb eredményeket alacsonyabb költséggel a magyar keresési szokások ismeretében.',
  category: 'Marketing',
  author: sampleAuthors['marton-marques'],
  publishedAt: '2025-01-22',
  readTime: '9 perc olvasás',
  featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
  featured: false,
}
```

This post will appear at: `yoursite.com/blog/google-ads-optimalizalas-magyar-piac`

---

## 🚀 After Adding Posts

Remember to:
1. Build the project: `npm run build`
2. Test all pages work
3. Check mobile responsive
4. Verify SEO metadata
5. Deploy to production

---

## 💡 Pro Tips

1. **Headlines**: Use numbers, how-to, and questions for higher engagement
2. **Images**: Stick to professional business/tech themes
3. **Categories**: Be consistent - don't add new categories without updating code
4. **Featured Post**: Change weekly to highlight latest content
5. **Read Time**: Be honest - readers notice if it's wrong

---

## 🎯 Content Ideas by Category

### Marketing
- Email kampány tippek
- Social media stratégiák
- SEO alapok
- PPC optimalizálás
- Content marketing

### Strategy
- Üzleti tervezés
- Versenyanalízis
- Pozicionálás
- Növekedési stratégia
- KPI meghatározás

### Analytics
- Google Analytics 4 használat
- Dashboard építés
- Metrika választás
- A/B tesztelés
- Prediktív analitika

### Growth
- Funnel optimalizálás
- Viral mechanizmusok
- Retention stratégiák
- Onboarding folyamatok
- Referral programok

### Leadership
- Csapatépítés
- Döntéshozatal
- Remote munka
- Coaching
- Kommunikáció

---

Need help adding your first post? Just tell me the details and I'll add it for you! 🚀
