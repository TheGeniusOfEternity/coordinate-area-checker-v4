export interface Translations {
  page: {
    welcome: {
      title: {
        register: string;
        login: string;
      };
      form: {
        email: {
          label: string;
          placeholder: string;
          errors: {
            empty: string;
            invalid: string;
          };
        };
        group: {
          label: string;
          placeholder: string;
          error: string;
        };
        password: {
          label: string;
          placeholder: {
            register: string;
            login: string;
          };
          errors: {
            empty: string;
            short: string;
          };
        };
        passwordConfirm: {
          label: string;
          placeholder: string;
          error: string;
        };
        name: {
          label: string;
          placeholder: string;
          error: string;
        };
        surname: {
          label: string;
          placeholder: string;
          error: string;
        };
        patronymic: {
          label: string;
          placeholder: string;
          error: string;
        };
        submit: {
          register: string;
          login: string;
        };
      };
      redirect: {
        register: {
          text: string;
          link: string;
        };
        login: {
          text: string;
          link: string;
        };
      };
    };
  };
}