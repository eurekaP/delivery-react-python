import React from 'react';

// material-ui
import { useTheme } from '@material-ui/core/styles';

// assets
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

//-----------------------|| AVATAR STATUS ICONS ||-----------------------//

const AvatarStatus = (props) => {
    const theme = useTheme();
    switch (props.status) {
        case 'available':
            return (
                <FiberManualRecordIcon
                    sx={{
                        cursor: 'pointer',
                        color: theme.palette.success.dark,
                        verticalAlign: 'middle',
                        fontSize: '14px',
                        mr: props.mr
                    }}
                />
            );

        case 'do_not_disturb':
            return (
                <FiberManualRecordIcon
                    sx={{
                        cursor: 'pointer',
                        color: theme.palette.warning.dark,
                        verticalAlign: 'middle',
                        fontSize: '14px',
                        mr: props.mr
                    }}
                />
            );

        case 'offline':
            return (
                <FiberManualRecordIcon
                    sx={{
                        cursor: 'pointer',
                        color: theme.palette.error.dark,
                        verticalAlign: 'middle',
                        fontSize: '14px',
                        mr: props.mr
                    }}
                />
            );

        default:
            return null;
    }
};

export default AvatarStatus;
