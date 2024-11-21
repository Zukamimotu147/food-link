type AuthHeaderProps = {
  label: string;
  title: string;
};

const AuthHeader = ({ label, title }: AuthHeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center">
      <h1 className="font-bold text-4xl text-customGreen">{title}</h1>
      <p className="text-md text-white">{label}</p>
    </div>
  );
};

export default AuthHeader;
