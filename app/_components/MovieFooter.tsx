import { Film, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#4338CA] h-[280px] text-white mt-10 w-full">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="font-bold flex items-center gap-2 text-lg">
            <Film />
            Movie Z
          </h2>
          <p className="text-sm mt-2">© 2024 Movie Z. All Rights Reserved.</p>
        </div>

        <div className="flex flex-col text-sm text-[#FAFAFA] gap-5">
          <h3>Contact Information</h3>
          <div className="flex items-center gap-4">
            <Mail />
            <p className="flex flex-col">
              Email:<span>support@movieZ.com</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Phone />
            <p className="flex flex-col">
              Phone:<span>+976 (11) 123-4567</span>
            </p>
          </div>
        </div>

        <div>
          <h3 className="flex flex-col text-sm text-[#FAFAFA]">Follow us</h3>
          <ul className="flex flex-wrap gap-4 font-medium text-sm text-[#FAFAFA]">
            <li>
              <a href="#" className="hover:underline">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Youtube
              </a>
            </li>
          </ul>
        </div>
        {/*  */}
      </div>
    </footer>
  );
}
