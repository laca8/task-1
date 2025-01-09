import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";

const Footer = () => {
  const services = [
    "Premium content",
    "Professional support",
    "PT online support",
    "World building network",
    "Social boost service",
    "Member services",
  ];

  const contactInfo = {
    phone1: "+1234567890",
    phone2: "+1987654321",
    phone3: "+1987654321",
    email: "info@example",
  };

  return (
    <footer className="bg-[#0F0F12] text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto w-full flex flex-row justify-between max-md:flex max-md:flex-col max-md:gap-4   gap-4">
        {/* Logo and Description */}
        <div className="w-full ">
          <div className="flex items-center space-x-2 mb-2">
            <img
              src="https://image.pngaaa.com/709/5059709-middle.png"
              className="w-12 h-12 rounded-full"
            />
          </div>
          <p className="text-lg text-gray-400">
            Lorem ipsum dolor sit amet consectetur, adipiscing elit. Nostrum
            temporibus dolores at ipsum asperiores est quod debitis fugit. Cum
            ullam tempora beatae sapiente.
          </p>
        </div>

        {/* Contact Information */}
        <div className="w-full text-center items-center mx-auto ">
          <h3 className="text-3xl font-bold mb-4">Contact us</h3>
          <ul className="flex flex-col gap-2">
            <li className="flex flex-row gap-2 mx-auto">
              <Phone className="w-6 h-6" />
              <span className="text-lg text-gray-400">
                {contactInfo.phone1}
              </span>
            </li>
            <li className="flex gap-2  mx-auto">
              <Phone className="w-6 h-6" />
              <span className="text-lg text-gray-400">
                {contactInfo.phone2}
              </span>
            </li>
            <li className="flex gap-2  mx-auto">
              <Phone className="w-6 h-6" />
              <span className="text-lg text-gray-400">
                {contactInfo.phone3}
              </span>
            </li>
            <li className="flex flex-row gap-2 mx-auto">
              <Mail className="w-6 h-6" />
              <span className="text-lg text-gray-400">{contactInfo.email}</span>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div className="w-full mx-auto   text-center">
          <h3 className=" font-bold mb-4 text-3xl">Services</h3>
          <ul className="space-y-2">
            {services.map((service, index) => (
              <li
                key={index}
                className="hover:text-teal-400 cursor-pointer transition-colors text-lg text-gray-400">
                {service}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto mt-8 pt-8 border-t-2 border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © 2024 Site design and created by Author Tech
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-teal-400 bg-[#97dde6] p-1 rounded-md">
              <Twitter className="w-5 h-5 text-[#298a97] " />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-teal-400 bg-[#97dde6] p-1 rounded-md">
              <Linkedin className="w-5 h-5 text-[#298a97] " />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-teal-400 bg-[#97dde6] p-1 rounded-md">
              <Instagram className="w-5 h-5 text-[#298a97] " />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-teal-400 bg-[#97dde6] p-1 rounded-md">
              <Youtube className="w-5 h-5 text-[#298a97] " />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-teal-400 bg-[#97dde6] p-1 rounded-md">
              <Facebook className="w-5 h-5 text-[#298a97] " />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
