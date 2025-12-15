# 🌍 Natours Backend API

این پروژه بک‌اند وب‌سایت **Natours** است که در دوره‌ی Node.js و Express پیاده‌سازی می‌شود. هدف این پروژه ساخت یک **RESTful API** تمیز، استاندارد و قابل توسعه برای مدیریت تورها، کاربران، رزروها و نظرات است.

---

## 🎯 هدف پروژه

* یادگیری عملی Node.js و Express
* درک عمیق معماری REST
* پیاده‌سازی CRUD به‌صورت اصولی
* آشنایی با Middleware، Routing و Error Handling
* آماده‌سازی یک بک‌اند واقعی در سطح Production

---

## 🧠 معماری کلی

این پروژه بر اساس **REST Architecture** طراحی شده و اصول زیر در آن رعایت شده است:

* Resource-based URLs
* استفاده صحیح از HTTP Methods
* Stateless بودن سرور
* تبادل داده با فرمت JSON
* جداسازی منطق‌ها (Controllers, Routes, Models)

---

## 🛠️ تکنولوژی‌های استفاده‌شده

* **Node.js**
* **Express.js**
* **File System (FS)** (در مراحل ابتدایی)
* **MongoDB & Mongoose** (در مراحل بعدی)
* **Postman** (برای تست API)

---

## 📁 ساختار پوشه‌ها

```
natours-backend/
│
├── dev-data/
│   └── data/
│       └── tours-simple.json
│
├── controllers/
│   └── tourController.js
│
├── routes/
│   └── tourRoutes.js
│
├── app.js
├── server.js
└── package.json
```

---

## 🚀 راه‌اندازی پروژه

### 1️⃣ نصب وابستگی‌ها

```bash
npm install
```

### 2️⃣ اجرای سرور

```bash
npm start
```

---

## 🔗 API Endpoints (نمونه)

### دریافت همه تورها

```http
GET /api/v1/tours
```

### دریافت یک تور با id

```http
GET /api/v1/tours/:id
```

### ساخت تور جدید

```http
POST /api/v1/tours
```

**Body (JSON):**

```json
{
  "name": "Forest Hiker",
  "duration": 5,
  "price": 497
}
```

---

### ویرایش تور (PATCH)

```http
PATCH /api/v1/tours/:id
```

**Body (JSON):**

```json
{
  "price": 399
}
```

---

### حذف تور

```http
DELETE /api/v1/tours/:id
```

---

## 🧩 Middlewareهای مهم

* `express.json()` → تبدیل body درخواست به JSON
* Middlewareهای لاگ‌گیری (در مراحل بعد)
* Middlewareهای امنیتی (در آینده)

---

## 📌 نکات مهم

* این پروژه صرفاً بک‌اند است و فرانت‌اند ندارد
* در مراحل ابتدایی داده‌ها در فایل JSON ذخیره می‌شوند
* در ادامه دوره، پروژه به MongoDB متصل خواهد شد

---

## 📚 منبع آموزشی

این پروژه بر اساس دوره‌ی معروف **Node.js, Express, MongoDB & More** ساخته می‌شود.

🌐 وب‌سایت اصلی پروژه:
[https://natours.dev](https://natours.dev)

---

## 👨‍💻 توسعه‌دهنده

**عرشیا**

* GitHub: [https://github.com/arshwia](https://github.com/arshwia)

---

## ⭐ وضعیت پروژه

🚧 در حال توسعه (آموزشی)

اگر این پروژه برات مفید بود، خوشحال می‌شم ⭐ بدی.
