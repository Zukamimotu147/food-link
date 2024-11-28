type FormHeaderProps = {
  label?: string;
  title?: string;
};

const FormHeader = ({ label, title }: FormHeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center">
      <h1 className="font-bold text-1xl sm:text-2xl lg:text-3xl text-customGreen ">{title}</h1>
      <p className="text-muted-foreground text-xl">{label}</p>
    </div>
  );
};

export default FormHeader;
