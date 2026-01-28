# LingoMaster AI - Deploy qilish qo'llanmasi

Ushbu loyihani internetga chiqarish va boshqalar bilan ulashish uchun quyidagi qadamlarni bajaring:

## 1. GitHub-ga yuklash
Kodingizni GitHub-dagi repository-ga joylashtiring.

## 2. Vercel-ga ulanish
1. [vercel.com](https://vercel.com) saytiga kiring.
2. GitHub orqali login qiling.
3. "New Project" tugmasini bosing va GitHub-dagi loyihangizni tanlang.

## 3. Environment Variables (MUHIM!)
Deploy oynasida **Environment Variables** bo'limiga quyidagini qo'shing:
- **Key**: `API_KEY`
- **Value**: [Sizning Gemini API kalitingiz]

Bu qadam bajarilmasa, AI Scan funksiyasi ishlamaydi.

## 4. Deploy tugmasini bosing
Vercel avtomatik ravishda loyihani yig'adi va sizga havola (URL) beradi. Shu havolani Telegram-da yoki boshqa joyda ulashishingiz mumkin.

---

## Tizim haqida ma'lumot
- **Auth**: Hozirgi tizim `LocalStorage` orqali ishlaydi. Bu prototype uchun mos, lekin ma'lumotlar faqat foydalanuvchining o'z brauzerida saqlanadi.
- **Xavfsizlik**: Haqiqiy xavfsizlik uchun Backend (Firebase/Supabase) ulash tavsiya etiladi.
