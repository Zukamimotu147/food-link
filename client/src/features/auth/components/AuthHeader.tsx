type AuthHeaderProps = {
  label: string;
  title: string;
};

const AuthHeader = ({ label, title }: AuthHeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center">
      <h1 className="font-semibold text-3xl">{title}</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};

export default AuthHeader;
