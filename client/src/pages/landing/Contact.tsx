import ContactForm from '@/features/contact/ContactForm';
const Contact = () => {
  return (
    <main className="bg-black bg-opacity-50 bg-blend-multiply bg-no-repeat bg-center bg-cover bg-contactImage">
      <div className="padding max-container flex flex-col lg:flex-row justify-center items-center h-screen gap-5">
        <ContactForm />
      </div>

      <footer>
        <div className="bg-customGreen h-[100px]">
          <p className="text-white text-center pt-10"> 2024 Food Link. All rights reserved </p>
        </div>
      </footer>
    </main>
  );
};

export default Contact;
