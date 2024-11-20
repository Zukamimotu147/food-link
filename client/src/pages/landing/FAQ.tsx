import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 mt-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-center sm:text-left text-customGreen">
          Frequently Asked Questions
        </h1>
        <Accordion type="single" collapsible className="mt-12">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg sm:text-2xl font-medium">
              How does the food donation process work?
            </AccordionTrigger>
            <AccordionContent className="mt-4 sm:mt-6 text-base sm:text-lg">
              When you submit a donation, you’ll include details such as the type of food and the
              preferred pickup time. Our team will review and approve the donation, then assign it
              to a charity based on their needs and location. We’ll notify the charity of the pickup
              time, so they can collect it as scheduled.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg sm:text-2xl font-medium">
              Who will receive our food donation?
            </AccordionTrigger>
            <AccordionContent className="mt-4 sm:mt-6 text-base sm:text-lg">
              We select a charity to receive your donation based on their needs and proximity. Our
              goal is to ensure that each donation reaches a charity that can make the most of it
              within your community.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg sm:text-2xl font-medium">
              How is the pickup time set?
            </AccordionTrigger>
            <AccordionContent className="mt-4 sm:mt-6 text-base sm:text-lg">
              You specify the pickup time when you submit the donation details. We’ll then confirm
              the time with the selected charity and arrange for them to collect the donation
              accordingly.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg sm:text-2xl font-medium">
              What types of food donations are accepted?
            </AccordionTrigger>
            <AccordionContent className="mt-4 sm:mt-6 text-base sm:text-lg">
              We accept various types of surplus food that meet our quality and safety standards.
              Donations should be fresh, safe for consumption, and packaged appropriately. For
              specific guidelines, please refer to our donation policy.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg sm:text-2xl font-medium">
              How often can we donate?
            </AccordionTrigger>
            <AccordionContent className="mt-4 sm:mt-6 text-base sm:text-lg">
              You can donate as often as you have surplus food. Each donation is individually
              reviewed and processed, ensuring it reaches a charity that can benefit from it.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger className="text-lg sm:text-2xl font-medium">
              How is food safety managed during the donation process?
            </AccordionTrigger>
            <AccordionContent className="mt-4 sm:mt-6 text-base sm:text-lg">
              All donations must meet our safety guidelines to ensure quality. Charities also follow
              safe handling procedures, keeping the food safe from pickup to delivery.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger className="text-lg sm:text-2xl font-medium">
              Can we view a history of our donations?
            </AccordionTrigger>
            <AccordionContent className="mt-4 sm:mt-6 text-base sm:text-lg">
              Yes, you can track all previous donations through our donation history feature,
              including details on the receiving charities and pickup arrangements.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-8">
            <AccordionTrigger className="text-lg sm:text-2xl font-medium">
              What happens if our donation isn’t approved?
            </AccordionTrigger>
            <AccordionContent className="mt-4 sm:mt-6 text-base sm:text-lg">
              If a donation doesn’t meet our guidelines, we’ll notify you with feedback. You’re
              welcome to make adjustments and resubmit if the surplus food still meets safety and
              quality standards.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-9">
            <AccordionTrigger className="text-lg sm:text-2xl font-medium">
              Is there a cost to participate in the donation program?
            </AccordionTrigger>
            <AccordionContent className="mt-4 sm:mt-6 text-base sm:text-lg">
              No, our program is free for restaurants. We handle the approval, assignment, and
              pickup coordination on your behalf.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-10">
            <AccordionTrigger className="text-lg sm:text-2xl font-medium">
              Who can we contact if we have additional questions?
            </AccordionTrigger>
            <AccordionContent className="mt-4 sm:mt-6 text-base sm:text-lg">
              For further assistance, please contact our support team at foodlinksupport@gmail.com.
              We’re here to support you throughout the donation process.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
