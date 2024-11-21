import ContactForm from '@/features/contact/ContactForm';
const Contact = () => {
  return (
    <main>
      <div className="padding max-container flex justify-center items-center h-screen">
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
