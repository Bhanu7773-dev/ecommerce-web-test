export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 py-8 text-sm text-gray-600">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="text-base font-semibold text-gray-900">FashionX</h3>
            <p className="mt-2">Modern, minimal fashion for everyone.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Company</h4>
            <ul className="mt-2 space-y-1">
              <li><a className="hover:underline" href="#">About</a></li>
              <li><a className="hover:underline" href="#">Careers</a></li>
              <li><a className="hover:underline" href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Follow</h4>
            <ul className="mt-2 space-y-1">
              <li><a className="hover:underline" href="#">Instagram</a></li>
              <li><a className="hover:underline" href="#">Twitter</a></li>
              <li><a className="hover:underline" href="#">Facebook</a></li>
            </ul>
          </div>
        </div>
        <p className="mt-6">© {new Date().getFullYear()} FashionX. All rights reserved.</p>
      </div>
    </footer>
  )
}
