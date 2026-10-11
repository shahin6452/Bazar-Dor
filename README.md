# 🛒 বাজার দর | BazarDor

**প্রয়োজনীয় পণ্যের দাম এক নজরে।**

Bazar Dor is a Bengali-language market price tracking web application that helps users explore daily prices of essential products, compare market-wise prices, and identify which products have increased or decreased in price.

🔗 **Live Link:** (https://bazar-dor-git-main-t5-5438.vercel.app/)

---

## 📖 About the Project

বাজার দর একটি সহজ ও ব্যবহারবান্ধব ওয়েব অ্যাপ্লিকেশন, যেখানে চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও অন্যান্য নিত্যপ্রয়োজনীয় পণ্যের দাম দেখা যায়।

Users can explore products, browse categories, compare prices across markets, track daily price changes, and access protected product details after signing in.

The application is built with Next.js and designed to provide a responsive experience on mobile, tablet, and desktop devices.

## ✨ Key Features

### 1. 📈 Live-Style Price Ticker
- Displays product names, prices, units, and price-change indicators.
- Uses a continuously scrolling ticker to highlight market updates.
- Shows upward, downward, and unchanged price indicators.

### 2. 🔺 Price Increase and Decrease Sections
- Highlights the top products with rising prices.
- Displays products with falling prices.
- Helps users quickly identify daily price movements.

### 3. 🛍️ All Products
- Displays products in a responsive card grid.
- Shows product illustrations, names, units, prices, and percentage changes.
- Allows users to open product details from product cards.

### 4. 🗂️ Category Browsing
- Organizes products by category.
- Supports filtering products by category.
- Provides price sorting options, including lowest-to-highest and highest-to-lowest.
- Handles numeric prices rather than sorting them as text.

### 5. 🏪 Market-Wise Price Comparison
- Displays product price summaries.
- Shows minimum and maximum prices.
- Presents market-wise price information in a table.
- Supports horizontal scrolling for wide tables on smaller screens.

### 6. 🔐 Authentication
- Email and password authentication using Better Auth.
- Google and GitHub social authentication support.
- Protected pages for authenticated users.
- Toast notifications for user feedback.

### 7. 👤 User Profile
- Displays signed-in user information.
- Supports user name updates through the profile functionality.

### 8. 📱 Responsive Design
- Mobile-friendly layouts and navigation.
- Responsive product grids and content sections.
- Flexible hero section and page layouts.
- Responsive table scrolling for smaller screens.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js 16 | Application framework and routing |
| React 19 | UI components |
| JavaScript | Application logic |
| Tailwind CSS 4 | Styling and responsive design |
| daisyUI 5 | UI components and utility classes |
| HeroUI | Additional UI components |
| Better Auth | Authentication and session management |
| MongoDB | Authentication data storage |
| react-hot-toast | Toast notifications |
| ESLint | Code quality and linting |

## 📡 API Integration

The application uses the Bazar Dor API to retrieve product and category information.

**Default API Base URL:**

`https://openapi.programming-hero.com/api/bazardor`

An alternative API base URL is available:

`https://api.abcz.workers.dev/api/bazardor`

## 📱 Responsive Compatibility

Bazar Dor is designed for:

- Mobile phones
- Tablets
- Desktop computers

The responsive layout uses Tailwind CSS breakpoints and flexible containers to help maintain usability across different screen sizes.

## 🎯 Project Goals

- Make everyday market prices easier to explore.
- Help users compare prices across different markets.
- Present price increases and decreases clearly.
- Provide a convenient Bengali-language user experience.
- Practice modern web development with Next.js, React, authentication, APIs, and responsive design.

---

**বাজার দর — প্রতিদিনের প্রয়োজনীয় পণ্যের দাম এক নজরে।** 💚
