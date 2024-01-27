import React from "react";
React.useLayoutEffect = React.useEffect;
export default function useResponsiveDevice() {
  const [device, setDevice] = React.useState();
  const DeviceTypes = {
    DESKTOP: 1,
    MOBILE: 0,
    BigScreen: 2
  };
  React.useLayoutEffect(() => {
    const handleResize = () => {
      setDevice(
        window.innerWidth < 768 ? DeviceTypes.MOBILE : window.innerWidth > 1365 ? DeviceTypes.BigScreen : DeviceTypes.DESKTOP
      );
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return {
    isMobile: device === DeviceTypes.MOBILE,
    isDesktop: device === DeviceTypes.DESKTOP,
    isBigDevice: device === DeviceTypes.BigScreen
  };
}
