export interface Translations {
  request: {
    common: {
      error: {
        summary: string;
      };
    };
    login: {
      success: {
        summary: string;
        detail: string;
      };
    };
    register: {
      success: {
        summary: string;
        detail: string;
      };
    };
    refreshJwt: {
      success: {
        summary: string;
        detail: string;
      };
    };
  };
  page: {
    common: {
      pageTitle: string;
    };
    welcome: {
      pageTitle: {
        login: string;
        register: string;
      }
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
    home: {
      pageTitle: string;
      header: {
        profile: string;
        signOut: string;
      };
      table: {
        header: {
          status: string;
          hitTime: string;
          executionTime: string;
        },
        body: {
          isHit: {
            hit: string;
            miss: string;
          },
          executionTime: string;
        }
      },
      form: {
        title: string;
        submit: string;
        reset: string;
        yLabel: string;
      };
    };
  };
}