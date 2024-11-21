const LoginForm = () => {
  const handleLoginGoogle = () => {
    window.open('http://localhost:3000/auth/google', '_self');
  };
  return (
    <section className="relative h-screen w-screen">
      <video
        className="absolute top-0 left-0 h-full w-full object-cover"
        src="https://videos.pexels.com/video-files/6893983/6893983-uhd_2560_1440_25fps.mp4"
        autoPlay
        loop
        muted
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      <div className="relative z-10 flex items-center justify-center h-full">
        <CardWrapper
          label="Register Form"
          title="Register"
          backButtonHref="/auth/login"
          backButtonLabel="Already have an account?">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Email..." {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Password..." {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter confirm Password..." {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Register
              </Button>
            </form>
            <div className="flex justify-center">
              <Button className="m-2" onClick={handleLoginGoogle}>
                <img
                  src="https://img.icons8.com/?size=100&id=P7UIlhbpWzZm&format=png&color=000000"
                  alt="gmail icon"
                  className="w-6 h-6"
                />
                Sign In with Google
              </Button>
            </div>
          </Form>
        </CardWrapper>
      </div>
    </section>
  );
};

export default LoginForm;
