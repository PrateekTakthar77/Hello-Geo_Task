import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './globals.css';

export default function RootLayout({ children }) {
    return (
        <html>
            <body class="bg-custom-gray flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow container mx-auto">
                    {children} {/* This line is crucial */}
                </main>
                <Footer />
            </body>
        </html>
    );
}

