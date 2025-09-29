export default function Footer() {
    return (
        <footer className="border-t bg-white">
            <div className="container mx-auto max-w-5xl p-4 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} B5A7 Portfolio. All rights reserved.
            </div>
        </footer>
    );
}
