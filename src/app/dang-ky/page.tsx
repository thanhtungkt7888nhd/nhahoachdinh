import DangKyForm from "./DangKyForm";

export default function DangKyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fdf4] to-stone-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🌿</div>
          <h1 className="text-2xl font-bold text-stone-800">Tạo Tài Khoản</h1>
          <p className="text-stone-500 text-sm mt-2">Lần đầu hoàn toàn miễn phí</p>
        </div>
        <DangKyForm />
        <p className="text-center text-sm text-stone-500 mt-6">
          Đã có tài khoản?{" "}
          <a href="/dang-nhap" className="text-[#2d6a4f] font-medium hover:underline">
            Đăng nhập
          </a>
        </p>
      </div>
    </div>
  );
}
