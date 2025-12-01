import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex flex-col items-center gap-4">
            <div className="flex w-full justify-evenly">
                <div>
                    <h2 className="text-lg font-semibold">Navigation</h2>
                    <div className="flex flex-col gap-2">
                        <Link href="/" className="hover:underline">Landing Page</Link>
                        <Link href="/app" className="hover:underline">Dashboard</Link>
                        <Link href="/app/schedule-lab" className="hover:underline">Schedule Lab</Link>
                        <Link href="/app/your-requests" className="hover:underline">Your Requests</Link>
                    </div>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Social</h2>
                    <div className="flex flex-col gap-2">
                        <Link href="https://instagram.com/syntesa" className="hover:underline">Instagram</Link>
                        <Link href="https://github.com/wearesyntesa" className="hover:underline">Github</Link>
                        <Link href="https://discord.gg/KeCh9tb8hv" className="hover:underline">Discord</Link>
                    </div>
                </div>
                <div className="flex flex-col max-w-80">
                    <h2 className="text-lg font-semibold">Contact</h2>
                    <div className="flex flex-col gap-2">
                        <div>
                            <h3 className="font-semibold">Alamat</h3>
                            <Link href="https://maps.app.goo.gl/RqvU4dFsawrRhWXd7">Universitas Negeri Surabaya
                                A10 Building, 3rd Floor, Room 3 & 4
                                Surabaya, Indonesia</Link>
                        </div>
                        <div>
                            <h3 className="font-semibold">Telp</h3>
                            <Link href="wa://send?phone=089-------">089-------</Link>
                        </div>
                        <div>
                            <h3 className="font-semibold">Email</h3>
                            <Link href="mailto:contact@syntesa.org">contact@syntesa.org</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p>© 2024 Ketuk. All rights reserved.</p>
            </div>
        </footer>
    )
}