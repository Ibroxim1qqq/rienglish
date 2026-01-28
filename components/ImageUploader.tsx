
import React, { useRef, useState } from 'react';

interface ImageUploaderProps {
  onImageSelected: (base64: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    if (preview) {
      onImageSelected(preview);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="w-full p-6 border-2 border-dashed border-indigo-300 rounded-3xl bg-indigo-50 flex flex-col items-center justify-center text-center">
        {!preview ? (
          <>
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <p className="text-gray-600 mb-4 font-medium">So'zlar yozilgan rasm yoki skrinshotni yuklang</p>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-indigo-600 text-white px-8 py-3 rounded-2xl hover:bg-indigo-700 transition-all font-semibold shadow-lg active:scale-95"
            >
              Rasm tanlash
            </button>
          </>
        ) : (
          <div className="relative w-full">
            <img src={preview} alt="Preview" className="w-full h-64 object-contain rounded-xl shadow-inner mb-4" />
            <div className="flex gap-2 justify-center">
              <button 
                onClick={() => setPreview(null)}
                className="bg-gray-200 text-gray-700 px-6 py-2.5 rounded-xl hover:bg-gray-300 transition-all font-medium"
              >
                O'chirish
              </button>
              <button 
                onClick={handleConfirm}
                className="bg-green-600 text-white px-6 py-2.5 rounded-xl hover:bg-green-700 transition-all font-bold shadow-lg"
              >
                Tahlil qilish
              </button>
            </div>
          </div>
        )}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
      </div>

      <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 w-full">
        <h3 className="text-blue-800 font-bold mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Qanday ishlaydi?
        </h3>
        <ul className="text-sm text-blue-700 space-y-2 list-disc list-inside">
          <li>So'zlar ro'yxati tushirilgan rasm yuklang.</li>
          <li>Sun'iy intellekt so'zlarni ajratib oladi.</li>
          <li>Sizga flashcardlar va testlar tayyorlab beradi.</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageUploader;
