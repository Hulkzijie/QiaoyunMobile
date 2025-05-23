import { createTheme } from '@rneui/themed';

export const theme = createTheme({
    lightColors: {
        primary: '#fe7000', // 保持与渐变起始色一致
        secondary: '#10B981',
        background: '#FFFFFF',
        white: '#FFFFFF',
        black: '#000000',
        grey0: '#393e42',
        grey1: '#43484d',
        grey2: '#5e6977',
        grey3: '#86939e',
        grey4: '#bdc6cf',
        grey5: '#e1e8ee',
        greyOutline: '#bbb',
        success: '#52c41a',
        error: '#ff190c',
        warning: '#faad14',
        disabled: 'hansa',
    },
    darkColors: {
        primary: '#fe7000', // 保持与渐变起始色一致
        secondary: '#34D399',
        background: '#1F2937',
        white: '#FFFFFF',
        black: '#000000',
        grey0: '#F9FAFB',
        grey1: '#F3F4F6',
        grey2: '#E5E7EB',
        grey3: '#D1D5DB',
        grey4: '#9CA3AF',
        grey5: '#6B7280',
        greyOutline: '#374151',
        success: '#52c41a',
        error: '#ff190c',
        warning: '#faad14',
        disabled: 'hansa',
    },
    mode: 'light',
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
    },
    components: {
        Button: {
            raised: true,
            containerStyle: {
                borderRadius: 8,
            },
            buttonStyle: {
                backgroundColor: '#fe7000',
                padding: 12,
            },
            titleStyle: {
                fontSize: 16,
                fontWeight: 'bold',
                color: '#FFFFFF',
            },
        },
        Card: {
            containerStyle: {
                borderRadius: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            },
        },
        Input: {
            containerStyle: {
                paddingHorizontal: 0,
            },
            inputContainerStyle: {
                borderBottomWidth: 1,
                borderBottomColor: '#E5E7EB',
            },
            inputStyle: {
                fontSize: 16,
            },
        },
        Text: {
            h1Style: {
                fontSize: 32,
                fontWeight: 'bold',
            },
            h2Style: {
                fontSize: 24,
                fontWeight: 'bold',
            },
            h3Style: {
                fontSize: 20,
                fontWeight: 'bold',
            },
            h4Style: {
                fontSize: 18,
                fontWeight: 'bold',
            },
        },
    },
});