export const appTheme = {
  /* -------------------------------------------------------------------------- */
  /*                                   Button                                   */
  /* -------------------------------------------------------------------------- */

  button: {
    defaultProps: {
      variant: "filled",
      size: "sm", // "md"
      color: "blue",
      fullWidth: false,
      ripple: true,
      className: "", // "p-2"
    },
    styles: {
      base: {
        initial: {
          verticalAlign: "middle",
          userSelect: "none",
          fontFamily: "fontFamily", // "font-sans"
          fontWeight: "font-bold",
          textAlign: "center",
          textTransform: "normal", // "uppercase"
          transition: "transition-all",
          disabled:
            "disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none",
        },
        fullWidth: { display: "block", width: "w-full" },
      },
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                                   Dialog                                   */
  /* -------------------------------------------------------------------------- */

  dialog: {
    defaultProps: {
      size: "md",
      dismiss: {},
      animate: { unmount: {}, mount: {} },
      className: "",
    },
    styles: {
      base: {
        backdrop: {
          display: "grid",
          placeItems: "place-items-center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "w-screen",
          height: "h-screen",
          backgroundColor: "bg-gray-800 dark:bg-gray-700", // "bg-black"
          backgroundOpacity: "bg-opacity-60 dark:bg-opacity-60", // "bg-opacity-60"
          backdropFilter: "backdrop-blur-sm",
        },
        container: {
          position: "relative",
          bg: "bg-secondary dark:bg-primary", // "bg-white"
          p: "px-4 py-2", // none
          m: "m-4",
          borderRadius: "rounded-lg",
          boxShadow: "shadow-2xl",
          color: "text-blue-gray-500",
          fontSmoothing: "antialiased",
          fontFamily: "font-sans",
          fontSize: "text-base",
          fontWeight: "font-light",
          lineHeight: "leading-relaxed",
          overflow: "overflow-hidden",
        },
      },
    },
  },

  dialogHeader: {
    styles: {
      base: {
        color: "text-primary dark:text-secondary",
      },
    },
  },

  dialogBody: {
    styles: {
      base: {
        initial: {
          color: "text-primary dark:text-secondary",
        },
      },
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                                   Tooltip                                  */
  /* -------------------------------------------------------------------------- */
  tooltip: {
    defaultProps: {
      interactive: false,
      placement: "top",
      offset: 5,
      dismiss: {},
      animate: { unmount: {}, mount: {} },
      className: "",
    },
    styles: {
      base: {
        bg: "bg-black dark:bg-primary2",
        py: "py-1.5",
        px: "px-3",
        borderRadius: "rounded-lg",
        fontFamily: "font-sans",
        fontSize: "text-sm",
        fontWeight: "font-normal",
        color: "text-secondary dark:text-secondary",
        outline: "focus:outline-none",
        overflowWrap: "break-words",
        zIndex: "z-[999]",
        whiteSpace: "whitespace-normal",
      },
    },
  },
};
