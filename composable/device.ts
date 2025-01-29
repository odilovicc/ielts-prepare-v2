import { ref, onMounted, onUnmounted } from 'vue';
import { IDeviceType } from '~/types/helpers';

export function useDeviceType() {
    const deviceType = ref<IDeviceType>(IDeviceType.DESKTOP);
    const isMobile = ref(false);
    const isTablet = ref(false);
    const isDesktop = ref(true);

    const updateDeviceType = () => {
        const width = window.innerWidth;
        
        if (width < 768) {
            deviceType.value = IDeviceType.MOBILE;
            isMobile.value = true;
            isTablet.value = false; 
            isDesktop.value = false;
        } else if (width >= 768 && width < 1024) {
            deviceType.value = IDeviceType.TABLET;
            isMobile.value = false;
            isTablet.value = true;
            isDesktop.value = false;
        } else {
            deviceType.value = IDeviceType.DESKTOP;
            isMobile.value = false;
            isTablet.value = false;
            isDesktop.value = true;
        }
    };

    onMounted(() => {
        updateDeviceType();
        window.addEventListener('resize', updateDeviceType);

        onUnmounted(() => {
            window.removeEventListener('resize', updateDeviceType);
        });
    });

    return {
        deviceType,
        isMobile,
        isTablet, 
        isDesktop
    };
}
