export const Footer = () => {
    return (
        <footer className="mt-20 border-t border-black/10 bg-white/60 backdrop-blur-sm">
            <div className="mx-auto max-w-6xl px-4 py-12">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <h4 className="text-sm font-semibold tracking-wide text-neutral-900">Product</h4>
                        <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                            <li><a className="hover:text-[#7d8a65]" href="#">Landing Page</a></li>
                            <li><a className="hover:text-[#7d8a65]" href="#">Popup Builder</a></li>
                            <li><a className="hover:text-[#7d8a65]" href="#">Web-design</a></li>
                            <li><a className="hover:text-[#7d8a65]" href="#">Content</a></li>
                            <li><a className="hover:text-[#7d8a65]" href="#">Integrations</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold tracking-wide text-neutral-900">Use Cases</h4>
                        <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                            <li><a className="hover:text-[#7d8a65]" href="#">Web-designers</a></li>
                            <li><a className="hover:text-[#7d8a65]" href="#">Marketers</a></li>
                            <li><a className="hover:text-[#7d8a65]" href="#">Small Business</a></li>
                            <li><a className="hover:text-[#7d8a65]" href="#">Website Builder</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold tracking-wide text-neutral-900">Policy</h4>
                        <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                            <li><a className="hover:text-[#7d8a65]" href="#">Privacy Policy</a></li>
                            <li><a className="hover:text-[#7d8a65]" href="#">Terms of Use</a></li>
                            <li><a className="hover:text-[#7d8a65]" href="#">Sales and Refunds</a></li>
                            <li><a className="hover:text-[#7d8a65]" href="#">Legal</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold tracking-wide text-neutral-900">Company</h4>
                        <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                            <li><a className="hover:text-[#7d8a65]" href="#">About Us</a></li>
                            <li><a className="hover:text-[#7d8a65]" href="#">Careers</a></li>
                            <li><a className="hover:text-[#7d8a65]" href="#">FAQs</a></li>
                            <li><a className="hover:text-[#7d8a65]" href="#">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}