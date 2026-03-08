# 🚀 UGMS - Database Project

ยินดีต้อนรับสู่โปรเจกต์ระบบลงทะเบียนชมรม (Uniclub Management System) โปรเจกต์นี้พัฒนาด้วย **Next.js** และใช้ **Prisma** เเละ **Mongoose** ในการจัดการฐานข้อมูล โดยมีขั้นตอนการตั้งค่า (Setup) และการทดสอบดังนี้

---

## 🛠️ ขั้นตอนการติดตั้ง (Setup Project)

ทำตามขั้นตอนด้านล่างนี้เพื่อรันโปรเจกต์ในเครื่องของคุณ:

### 1. ติดตั้ง Dependencies
แนะนำให้ใช้ **Bun** เพื่อความรวดเร็ว แต่สามารถใช้ npm ได้เช่นกัน:
```bash
bun install
# หรือ
npm install
```

### 2. ตั้งค่าไฟล์ Environment Variables (.env)
เนื่องจากไฟล์ `.env` ไม่ถูก Push ขึ้นระบบ คุณต้องสร้างมันขึ้นมาใหม่ที่ Root Directory:

1. สร้างไฟล์ชื่อ `.env` โดยสามารถคัดลอกไฟล์ตัวอย่างได้จากคำสั่ง:
```bash
cp .env.example .env
```
2. หรือคัดลอกข้อความด้านล่างนี้ไปใส่ในไฟล์ `.env` โดยตรง:

```env
# MySQL 
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
DATABASE_USER="USER"
DATABASE_PASSWORD="PASSWORD"
DATABASE_NAME="DATABASE_NAME"
DATABASE_HOST="127.0.0.1"
DATABASE_PORT=3306

# MongoDB
MONGODB_URI="mongodb://localhost:27017/DATABASE_NAME"

# ความลับสำหรับการเข้ารหัส JWT (สุ่มขึ้นมาเองได้เลย)
JWT_SECRET="YOUR_SECRET_KEY"
```

### 3. เตรียมฐานข้อมูล (Database Setup)
หากคุณมี Docker ติดตั้งอยู่แล้ว สามารถรันฐานข้อมูลทั้ง MySQL และ MongoDB ได้ง่ายๆ ผ่านคำสั่ง:
```bash
docker-compose up -d
```

หลังจากฐานข้อมูลพร้อมแล้ว ให้ทำการ Sync Schema ของ Prisma และสร้าง Client:
```bash
bun prisma db push
bun prisma generate
# หรือ
npx prisma db push
npx prisma generate
```

---

## วิธีการรันโปรเจกต์ (Running Project)

เมื่อติดตั้งทุกอย่างเรียบร้อยแล้ว ให้รันคำสั่ง:

```bash
bun dev
# หรือ
npm run dev
```

เปิดเบราว์เซอร์ไปที่ [http://localhost:3000](http://localhost:3000) เพื่อดูผลลัพธ์

---

## การเพิ่มข้อมูลชมรม (Adding Club Data)

หากต้องการเพิ่มข้อมูลชมรมลงในระบบ (MongoDB) คุณสามารถใช้ไฟล์ JSON ที่เตรียมไว้ให้ในโฟลเดอร์ `public/JSON/` ได้เลย:

1.  **ที่อยู่ไฟล์**: `public/JSON/*.json` (เช่น `acoustic.json`, `astro.json`)
2.  **วิธีใช้**: นำเนื้อหาในไฟล์เหล่านี้ไปเพิ่ม (Insert) ลงใน Collection ของ MongoDB ที่คุณสร้างไว้ (เช่น `clubs`) เพื่อใช้เป็นข้อมูลตัวอย่างในการทดสอบระบบ

---

## ขั้นตอนการเทส (Simple Testing)

เพื่อให้มั่นใจว่าระบบทำงานได้ถูกต้อง ให้ตรวจสอบดังนี้:

1.  **หน้าแรก (Home)**: ตรวจสอบว่าหน้าเว็บโหลดขึ้นมาได้ปกติ ไม่ขึ้น Error
2.  **การเชื่อมต่อ DB**: ตรวจสอบ Log ใน Terminal ว่าไม่มี Error เกี่ยวกับ `DATABASE_URL` หรือการเชื่อมต่อ MySQL/MongoDB
3.  **การสมัครสมาชิก/เข้าสู่ระบบ**: ทดลองสมัครสมาชิกเพื่อเช็คว่าข้อมูลถูกบันทึกลงใน MySQL หรือไม่
4.  **ระบบชมรม**: ตรวจสอบว่าสามารถดึงข้อมูลชมรม (จาก MongoDB) มาแสดงผลได้หรือไม่

---

## Stack ที่ใช้ในโปรเจกต์
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Database ORM/ODM**: [Prisma](https://www.prisma.io/) (MySQL) & [Mongoose](https://mongoosejs.com/) (MongoDB)
- **Primary DB**: MySQL (Prisma)
- **Secondary DB**: MongoDB (Mongoose)
- **Authentication**: Custom Auth (JWT + Cookies) 
- **Styling**: Tailwind CSS + Shadcn UI
- **Runtime**: [Bun](https://bun.sh/) (แนะนำ)
