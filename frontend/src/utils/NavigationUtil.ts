let navigate: any = null;

export const setNavigate = (nav: any) => {
  navigate = nav;
};

export const redirectTo = (route: string) => {
  if (navigate) {
    navigate(route);
  }
};