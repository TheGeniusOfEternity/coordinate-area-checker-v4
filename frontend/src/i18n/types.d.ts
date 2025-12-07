export interface Translations {
  page: {
    welcome: {
      title: {
        register: string;
        login: string;
      },
      form: {
        email: {
          label: string;
          placeholder: string
        };
        group: {
          label: string;
          placeholder: string;
        };
        password: {
          label: string;
          placeholder: {
            register: string;
            login: string;
          }
        },
        passwordConfirm: {
          label: string;
          placeholder: string;
        },
        name: {
          label: string;
          placeholder: string;
        },
        surname: {
          label: string;
          placeholder: string;
        },
        patronymic: {
          label: string;
          placeholder: string;
        },
        submit: {
          register: string;
          login: string;
        }
      },
      redirect: {
        register: {
          text: string;
          link: string;
        },
        login: {
          text: string;
          link: string;
        }
      }
    }
  }
}