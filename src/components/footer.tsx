import Link from "next/link";

export default function Footer() {
    return (
			<footer className="bg-black text-white py-12">
				<div className="max-w-6xl mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
						{/* Navigation */}
						<div>
							<h2 className="text-lg font-semibold mb-4">Service</h2>
							<div className="flex flex-col gap-2">
								<Link href="/" className="hover:text-blue-400 transition">
									Landing Page
								</Link>
								<Link href="/app" className="hover:text-blue-400 transition">
									Dashboard
								</Link>
								<Link
									href="/app/schedule-lab"
									className="hover:text-blue-400 transition">
									Schedule Lab
								</Link>
								<Link
									href="/app/your-requests"
									className="hover:text-blue-400 transition">
									Your Requests
								</Link>
								<Link
									href="https://status.ketuk.app/"
									target="_blank"
									className="hover:text-blue-400 transition">
									Service status
								</Link>
							</div>
						</div>

						{/* Social */}
						<div>
							<h2 className="text-lg font-semibold mb-4">Social</h2>
							<div className="flex flex-col gap-2">
								<Link
									href="https://instagram.com/syntesa"
									target="_blank"
									className="hover:text-blue-400 transition">
									Instagram
								</Link>
								<Link
									href="https://github.com/wearesyntesa"
									target="_blank"
									className="hover:text-blue-400 transition">
									Github
								</Link>
								<Link
									href="https://discord.gg/KeCh9tb8hv"
									target="_blank"
									className="hover:text-blue-400 transition">
									Discord
								</Link>
							</div>
						</div>

						{/* Contact */}
						<div className="flex flex-col">
							<h2 className="text-lg font-semibold mb-4">Contact</h2>
							<div>
								<h3 className="font-semibold mb-1">Address</h3>
								<Link
									href="https://maps.app.goo.gl/RqvU4dFsawrRhWXd7"
									target="_blank"
									className="text-sm hover:text-blue-400 transition">
									Universitas Negeri Surabaya A10 Building, 3rd Floor, Room 3 &
									4 Surabaya, Indonesia
								</Link>
							</div>
							<div>
								<h3 className="font-semibold mb-1">Phone</h3>
								<Link
									href="https://wa.me/6283840382571"
									className="hover:text-blue-400 transition">
									+62 838-4038-2571
								</Link>
							</div>
							<div>
								<h3 className="font-semibold mb-1">Email</h3>
								<Link
									href="mailto:contact@ketuk.app"
									className="hover:text-blue-400 transition">
									contact@ketuk.app
								</Link>
							</div>
						</div>
					</div>

					<div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
						<p>© 2024 Ketuk. All rights reserved.</p>
					</div>
				</div>
			</footer>
		);
}