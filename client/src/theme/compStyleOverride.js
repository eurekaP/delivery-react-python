import { alpha } from '@mui/material/styles'
import { capitalize } from '../lib/common'

export const componentStyleOverrides = (theme) => {
    return {
    MuiFormHelperText: {
        styleOverrides: {
            root: {
                lineHeight: "1.67",
                letterSpacing: '0.4px',
                fontSize: '12px'
            }
        }
    },
    MuiButton: {
        styleOverrides: {
            root: {
                minWidth: "auto",
                padding: "3px 11px",
                lineHeight: "1.75",
                // padding: "5px 11px",
                // lineHeight: "1.25",
                letterSpacing: "0.4px",
                fontSize: "14px",
                border: "1px solid transparent",
                "& .MuiSvgIcon-root": {
                    width: "20px",
                    height: "20px"
                },
                "& .text-node": {
                    transform: "translateY(1px)", // hack to center the text node vertically
                    display: "inline-flex",
                    flexWrap: "wrap"
                }
            },
            sizeLarge: {
                padding: "7px 15px",
                lineHeight: "1.6",
                //letterSpacing: "0.46px",
                fontSize: "15px",
                "& .MuiSvgIcon-root": {
                    width: "24px",
                    height: "24px"
                }
            },
            sizeSmall: {
                padding: "0px 7px",
                lineHeight: "1.71",
                //padding: "3px 7px",
                letterSpacing: "0.46px",
                fontSize: "13px",
                "& .MuiSvgIcon-root": {
                    width: "16px",
                    height: "16px",
                },
                "& .MuiButton-iconSizeSmall": {
                    "&.MuiButton-startIcon": {
                        marginRight: "4px",
                        marginLeft: 0
                    },
                    "&.MuiButton-endIcon": {
                        marginLeft: "4px",
                        marginRight: 0
                    },
                }
            },
            outlined: ({ ownerState }) => ({
                borderColor: alpha(theme.palette[ownerState.color].main, 0.5),
            }),
            startIcon: {
                marginLeft: 0
            },
            endIcon: {
                marginRight: 0
            }
        },
        defaultProps: {
            disableElevation: true
        },

    },
    // MuiSvgIcon: {
    //     styleOverrides: {
    //         root: {
    //             width: "24px",
    //             height: "24px"
    //         }
    //     }
    // },
    MuiList: {
        styleOverrides: {
            padding: {
                paddingTop: '10px',
                paddingBottom: '10px',
            }
        }
    },
    MuiListItem: {
        styleOverrides: {
            button: {
                paddingLeft:  '11px',
                paddingRight: '12px',
                '&:hover': {
                    backgroundColor: theme.colors.blue50,
                    color: theme.palette.primary.main,
                    borderRadius: '4px',
                }
            },
            root: {
                '&.Mui-selected .MuiListItemIcon-root, &.Mui-selected .MuiListItemText-root, &.Mui-selected': {
                    backgroundColor: theme.colors.blue50,
                    color: theme.palette.primary.main,
                    borderRadius: '4px',
                },
                '&.Mui-selected:hover': {
                    backgroundColor: theme.colors.blue50,
                    color: theme.palette.primary.main,
                }
            }
        }
    },
    MuiListItemButton: {
        styleOverrides: {
            root: {
                '&:hover': {
                    backgroundColor: theme.palette.blue[50],
                },
                '&.MuiNavDrawerActive': {
                    //backgroundColor: 'unset',
                    '& .MuiTypography-body1, & .MuiListItemIcon-root': {
                        color: theme.palette.primary.main
                    }
                },
                '&:not(.MuiListItemButton-divider)': {
                    borderBottom: '1px solid transparent',
                }
            }
        },
        defaultProps: {
            type: 'default'
        },
        variants: [
            {
                props: { type: 'extended'},
                style: {
                    marginBottom: 'unset',
                    borderRadius: 'unset',
                    paddingTop: '12px',
                    paddingBottom: '11px',
                    paddingLeft: '24px',
                    paddingRight: '24px',
                    //border: '1px solid transparent',
                    '&:hover .MuiTypography-body1, &:hover .MuiListItemIcon-root': {
                        color: theme.palette.primary.main
                    },
                    '.MuiListItemIcon-root, .MuiTypography-body1': {
                        color: theme.palette.secondary.light
                    },
                }
            },
            {
                props: { type: 'default'},
                style: {
                    paddingLeft: '12px',
                    paddingRight: '11px',
                    paddingBottom: '7px',
                    marginBottom: '16px',
                    disabled: {
                        backgroundColor: theme.palette.gray,
                        color: theme.palette.grey[200]
                    },
                    '&:hover': {
                        backgroundColor: theme.palette.blue[50],
                        color: theme.palette.primary.main,
                        borderRadius: '4px',
                    },
                    '& .MuiTypography-body1': {
                        color: theme.palette.default.main
                    },
                    '&.MuiNavDrawerActive': {
                        color: theme.palette.primary.main,
                        backgroundColor: theme.palette.blue[50],
                        borderRadius: '4px',
                    },
                    '&.MuiChip-root': { //TODO
                        //marginTop: '4px',
                        //marginRight: '8px',
                        //marginLeft: '8px',
                        //marginBottom: '4px',
                        color: theme.palette.error.main,
                        backgroundColor: theme.palette.red[50]
                    },
                    '&.Mui-disabled': {
                        backgroundColor: theme.palette.gray,
                        color: theme.palette.grey[200]
                    }
                }
            }
        ]
    },
    MuiListItemIcon: {
        styleOverrides: {
            root: {
                minWidth: 'unset',
                paddingRight: '10px',
                color: theme.palette.secondary.light,
            }
        }
    },
    MuiListItemText: {
        styleOverrides: {
            root: {
                fontSize: '16px',
                paddingRight: '10px',
                color: theme.palette.secondary.light,
                //height: '24px',
            }
        }
    },

    MuiAvatar: {
        variants: [
            ...makeAvatarVariants( theme, 'small',      {
                sizeWithSpacing: 6,
                borderSize:      1,
                textFontSize:    12,
                iconSize:        16,
            }),
            ...makeAvatarVariants( theme, 'medium',     {
                sizeWithSpacing: 10,
                borderSize:      2,
                textFontSize:    14,
                iconSize:        20,
            }),
            ...makeAvatarVariants( theme, 'extraLarge', {
                sizeWithSpacing: 22,
                borderSize:      3,
                textFontSize:    34,
                iconSize:        24,
            }),
        ],
        styleOverrides: {
            colorDefault: {
                backgroundColor: theme.colors.blue100,
            },
        }
    },
    MuiChip: {
        styleOverrides: {
            root: {
                color: theme.palette.error.main,//not combining with background 'rgba(0, 0, 0, 0.3)',
                backgroundColor: theme.palette.red[50]
            },
            label: {
                paddingLeft:  '10px',
                paddingRight: '10px',
            },
        }
    },
    MuiPaper: {
        styleOverrides: {
            elevation1: {
                boxShadow: '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)'
            }
        },
        variants: [
            {
                props: { resizable: true },
                style: ({count, size}) => {
                    const min = 5, max = 10
                    const height = size === 'medium' ? 48 : 40
                    const paddings = 8 + 8
                    const minHeight = ((count < min ? count : min) * height) + paddings + 'px'
                    return {
                        resize: 'both',
                        minWidth: '100%',
                        maxWidth: '200%',
                        minHeight,
                        height: minHeight,   // TODO: height must be calculated only once onMount
                        maxHeight: ((count < max ? count : max) * height) + paddings + 'px',
                        '& > ul': {
                            maxHeight: 'unset',
                        }
                    }
                }
            },
        ]
    },
    PrivateNotchedOutline: {
        styleOverrides: {
            root: {
                padding: "0 11px"
            },
            legendLabelled: {
                "& > span": {
                    paddingRight: 0
                }
            }
        }
    },
    MuiTableCell: {
        //padding: top right bottom left
        //variants: [ ], no variants :(
        styleOverrides: {
            root: {
                '&:last-child': {
                    borderRight: 'unset',
                },
                backgroundColor: theme.palette.white,
                borderRight:  '1px solid '+theme.colors.grey100,
                borderBottom: '1px solid '+theme.colors.grey100,

                '& .TextFieldTable': {
                    display: 'flex',
                    alignItems: 'center',
                    '& span.highlighted': {
                        backgroundColor: theme.palette.orange[200],
                    },
                },
                '& .TextFieldTable .MuiTypography-root': {
                    ...theme.typography.body2,
                    color: theme.palette.text.main,
                },
                '& .TextFieldTable .startAdornment': {
                    marginRight: '8px',
                },
                '& .TextFieldTable .endAdornment': {
                    marginLeft: 'auto',
                },

                '&.TextFieldTableHead': {
                    fontWeight: 'unset',
                    lineHeight: '20px',
                    '& .MuiTableSortLabel-root': {
                        width: '100%',
                        '& .MuiTableSortLabel-icon': {
                            marginLeft: 'auto',
                            marginRight: 0,
                        }
                    },
                },
                ...makeTableCellVariants( theme, 'large' , '8px 8px 8px 12px', 56),
                ...makeTableCellVariants( theme, 'medium', '8px 8px 8px 12px', 40),
                ...makeTableCellVariants( theme, 'small' , '2px 4px 2px 12px', 24),

                //'&:hover': {
                //    backgroundColor: theme.palette.table.hoverRow,
                //},
                '.editable-table td&, .editable-table th&': {
                    padding: 0,
                    height: 'inherit',
                },
                '.editable-table td& > .editable-text-read': {
                    height: '100%',
                    cursor: 'pointer',
                },
                '.editable-table td& .editable-text-write': {
                    border: 'none',
                    outline: 'none',
                    height: '100%',
                    marginLeft: '-1px', //TODO with avatar
                    borderRadius: '3px',
                    ...theme.typography.body2,
                    font: 'unset',
                },
                '.editable-table td& .editable-text-write:focus-within': {
                    backgroundColor: theme.colors.blue50,
                },
                '.editable-table td& .editable-text-write:focus': {
                    backgroundColor: theme.colors.blue50,
                },
                '& .MuiCheckbox-root': {

                }
            },
            paddingCheckbox: {
                '.editable-table th&': {
                    padding: '0',
                    textAlign: 'center',
                },
            },
            head: {
                '&.MuiTableCell-root': { //to not use important
                    backgroundColor: theme.palette.table.headerMain,
                    '&:hover': {
                        backgroundColor: theme.palette.table.hoverRow,
                        '& .MuiTableSortLabel-root .MuiTableSortLabel-icon': {
                            opacity: 1,
                            color: theme.palette.table.sortIcon,
                        }
                    },
                },
                color: theme.palette.text.main,
                borderBottomColor: theme.palette.grey[400],
                '& .TextFieldTable': {
                    width: '100%',
                },
                '& .MuiTableSortLabel-root': {
                    marginLeft: 'auto',
                },
                '& .MuiTableSortLabel-root.MuiTableSortLabel-active': {
                    color: 'inherit',
                },
                '& .MuiTableSortLabel-root .MuiTableSortLabel-icon': {
                    //so that icon is ~= 13.7px ...
                    height: '20px',//'20.6px',
                    width:  '20px',//'20.6px',
                    marginLeft:  0,
                    marginRight: 0,
                },
                '& .MuiTableSortLabel-root .MuiTableSortLabel-icon:hover': {
                    backgroundColor: alpha( theme.palette.table.sortIcon, theme.palette.action.hoverOpacity),
                    borderRadius: '50%',
                },
            },
        },
        variants: [
            {
                props: { disablePadding: true },
                style: {
                    padding: 0
                }
            }
        ]
    },
    MuiTableRow: {
        styleOverrides: {
            root: {
                '.editable-table &': {
                    //height: '1px', //HACK 4 cell height inherit, needed for Opera..., doesnt work with Firefox
                    height: '100%', //HACK 4 Firefox
                },
                '&:hover': {
                    '& td': {
                        backgroundColor: theme.palette.table.hoverRow,
                    },
                    '&.selected td': {
                        backgroundColor: theme.palette.table.hoverRow,
                    },
                },
                '&.selected td': {
                    backgroundColor: theme.palette.table.activeRow,
                },
            }
        }
    },
    MuiTable: {
        styleOverrides: {
            root: {
                borderCollapse: 'separate',
                '.editable-table&': {
                    height: '1px', //HACK 4 cell height inherit, needed for Opera...
                }
            }
        }
    },
    MuiTab: {
        styleOverrides: {
            root: {
                padding: "12.5px 22.5px",
                fontSize: "14px",
                color: theme.palette.grey[300],
                lineHeight: "1.71",
                letterSpacing: "0.4px",
                flexDirection: "row",
                minHeight: "unset",
                "&:hover": {
                    backgroundColor: theme.palette.blue[50],
                },
                "&:active": {
                    color: theme.palette.grey[600]
                },
                "&.Mui-selected": {
                    color: theme.palette.primary.main,
                    "&:hover": {
                        color: theme.palette.blue[900],
                    },
                    "&:active": {
                        color: theme.palette.blue[900]
                    },
                },
                "& .MuiTouchRipple-root": {
                    color: theme.palette.primary.main,
                },
                "& .MuiSvgIcon-root": {
                    marginBottom: 0,
                    marginRight: theme.spacing(2)
                }
            },
            textColorInherit: {
                opacity: "initial"
            }
        }
    },
    // MuiTabs: {
    //     styleOverrides: {
    //         // root: {
    //         //     borderBottom: "1px solid " + theme.palette.grey[100]
    //         // }
    //     }
    // },


    MuiBackdrop: {
        styleOverrides: {
            root: {
                backgroundColor: alpha(theme.palette.grey[900], 0.8)
            },
            invisible: {
                backgroundColor: 'transparent'
            }
        }
    },
    MuiSwitch: {
        styleOverrides: {
            root: {
                padding: "13px 12px 13px 11px",
                height: theme.spacing(10)
            },
            switchBase: {
                padding: "10px",
                "&:not(.Mui-disabled) + .MuiSwitch-track": {
                    opacity: 0.3
                },
                "&:not(.Mui-checked) .MuiSwitch-thumb": {
                    backgroundColor: theme.colors.grey300
                }
            },
            track: {
                backgroundColor: theme.colors.grey300
            },
        }
    },
    MuiCheckbox: {
        styleOverrides: {
            root: ({ ownerState }) =>  {
            const color = theme.palette[ ownerState.checked ? 'primary' : ownerState.color].main
            return {
                padding: 0,
                boxSizing: "content-box",
                "& .MuiSvgIcon-fontSizeMedium": {
                    padding: theme.spacing(2)
                },
                "& .MuiSvgIcon-fontSizeSmall": {
                    padding: "2px"
                },

                '&.MuiButtonBase-root': {
                    color: color,

                    "&.Mui-disabled": {
                        color: alpha( color, 0.4)
                    },
                }
            }},

        },
        defaultProps: {
            color: "default"
        },
        variants: [
            {
                props: { disablePadding: true },
                style: {
                    '& .MuiSvgIcon-root': {
                        padding: 0
                    }
                }
            },
        ]
    },
    MuiFormControlLabel: {
        variants: [
            {
                props: { disableMargins: true },
                style: {
                    margin: 0
                }
            },
            {
                props: { fullWidth: true },
                style: {
                    width: '100%'
                }
            },
            {
                props: { centerContent: true },
                style: {
                    justifyContent: 'center'
                }
            },
            {
                props: { removeOffset: true },
                style: {
                    marginRight: 0
                }
            }
        ],
    },
    MuiFormLabel: {
        styleOverrides: {
            root: {
                color: theme.palette.secondary.light,
                lineHeight: "1.5",
                letterSpacing: "0.15px",
                "& .Mui-disabled": {
                    color: theme.palette.text.disabled
                }
            },
            asterisk: {
                // marginLeft: '-3px',
                color: theme.palette.error.main
            }
        }
    },
    MuiInputLabel: {
        styleOverrides: {
            animated: {
                pointerEvents: 'none',
                zIndex: 1,
                transition: 'all 200ms cubic-bezier(0.0,0,0.2,1) 0ms',
                '&, &.MuiInputLabel-outlined': {
                    left: '16px',
                },
                '&:not(.Mui-error):not(.Mui-disabled)': {
                    color: theme.palette.text.secondary,
                    '&.Mui-focused': {   // focus & activated
                        color: theme.palette.text.main
                    },
                },
                '&.Mui-error': {
                    '&:not(.MuiFormLabel-filled):not(.Mui-focused):not(.has-value)': {
                        color: theme.palette.text.main
                    }
                },
                '&.Mui-focused, &.MuiFormLabel-filled, &.force-shrink': {
                    transform: 'translateY(0%) scale(.75)',
                    top: 0,
                    marginTop: '-8px',
                    marginLeft: '0 !important',
                },
            },
        },
        defaultProps: {
            shrink: false
        },
        variants: [
            {
                props: { size: 'medium' },
                style: {
                    transform: 'translateY(16px)'
                }
            },
            {
                props: { size: 'small' },
                style: {
                    transform: 'translateY(8px)'
                }
            },
        ],
    },
    MuiInput: {
        styleOverrides: {
            root: {
                '&.MuiInputBase-root': {
                    marginTop: 0
                }
            }
        },
        defaultProps: {
            disableUnderline: true
        }
    },
    MuiInputBase: {
        styleOverrides: {
            root: {
                marginTop: 0,
                borderRadius: theme.shape.borderRadius,
                maxWidth: '100%',
                paddingLeft: '16px !important',
                paddingRight: '12px !important',
                '&.MuiInputBase-formControl': {
                    '& .MuiInputAdornment-root': {
                        '&.MuiInputAdornment-positionStart': {
                            '&:not(.MuiInputAdornment-hiddenLabel)': {
                                marginTop: 0,
                                marginBottom: 0,
                            }
                        }
                    }
                },
                '&:not(.MuiInputBase-fullWidth)': {
                    width: '280px',
                },
                '& .MuiInputAdornment-root': {
                    '&.leading-icon': {
                        marginRight: theme.spacing(2)
                    }
                },
                '&.Mui-disabled': {
                    backgroundColor: 'unset',
                    color: theme.palette.text.disabled,
                    '& .MuiInputAdornment-root': {
                        color: 'inherit'
                    }
                },
                '&.Mui-focused': {
                    '& .MuiInputBase-input': {
                        color: theme.palette.text.main
                    },
                },
                '& + .MuiFormHelperText-root': {
                    marginLeft: theme.spacing(4)
                }
            },
            input: {
                color: theme.palette.text.secondary,
                height: 'unset',
                minHeight: '24px',
                "&:-webkit-autofill": {     // change default autocomplete styles for different browsers
                    " &, &:hover, &:focus, &:active": {
                        WebkitBoxShadow: "0 0 0 30px white inset !important",
                        WebkitTextFillColor: theme.palette.secondary.light + " !important"
                     },
                     "&:first-line": {
                         fontSize: "16px",
                         lineHeight: "1.5",
                         letterSpacing: "0.15px",
                         fontWeight: "normal",
                         fontStretch: "normal",
                         fontStyle: "normal",
                         fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
                     }
                 },
                 'input&': {
                    padding: '0 !important',
                 }
            }
        },
        variants: [
            {
                props: { size: 'medium' },
                style: {
                    paddingTop: theme.spacing(4) + ' !important',
                    paddingBottom: theme.spacing(4) + ' !important',
                }
            },
            {
                props: { size: 'small' },
                style: {
                    paddingTop: theme.spacing(2) + ' !important',
                    paddingBottom: theme.spacing(2) + ' !important',
                }
            }
        ]
    },
    // MuiSelect: {
    //     styleOverrides: {
    //         select: {
    //             marginLeft: '-' + theme.spacing(4), // paddings of textfield
    //             marginRight: '-' + theme.spacing(3),
    //             paddingLeft: '16px',    // same as inputbase
    //             '&.MuiInputBase-inputAdornedStart': {
    //                 marginLeft: -(16 + 24 + 8) + 'px',  // offset with icon
    //                 paddingLeft: (16 + 24 + 8) + 'px'
    //             }
    //         },
    //         nativeInput: {
    //             '& + .MuiInputAdornment-root, & + .MuiSvgIcon-root': {
    //                 position: 'absolute',
    //                 top: '50%',
    //                 transform: 'translateY(-50%)',
    //                 right: theme.spacing(3) // same as padding right
    //             }
    //         },
    //         standard: {

    //             ...inputVariantStandard(theme),
    //             '&:not(.MuiInputBase-inputSizeSmall)': {
    //                 paddingTop: '16.5px',
    //                 paddingBottom: '16.5px'
    //             }
    //         }
    //         // iconOutlined: {
    //         //     right: "12px"
    //         // }
    //     }
    // },
    MuiTextField: {
        // styleOverrides: {
        //     root: {
        //         ...hasStartAdornmentClass()
        //     },
        // },
        variants: [
            {
                props: { variant: 'standard' },
                style: inputVariantStandard(theme)
            },
            {
                props: { hideInput: true },
                style: {
                    '& .MuiInputBase-input': {
                        minHeight: '0',
                        height: 0
                    }
                }
            }
        ]
    },
    MuiOutlinedInput: {
        styleOverrides: {
            root: {
                '& .MuiOutlinedInput-notchedOutline': {
                    borderWidth: '1px !important'
                },
                '&.MuiInputBase-root': {
                    '&:not(.Mui-focused):not(.Mui-error):not(.Mui-disabled)': {
                        '&:hover': {
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.dark,
                            }
                        }
                    },
                },
                '&.Mui-focused': {
                    '&:not(.Mui-error)': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.grey[100]
                        }
                    }
                }
            },
        }
    },
    MuiInputAdornment: {
        styleOverrides: {
            root: {
                color: theme.palette.grey[300]
            }
        }
    },
    MuiFilledInput: {
       defaultProps: {
            disableUnderline: true
        }
    },
    MuiAutocomplete: {
        styleOverrides: {
            root: {
                ...hasStartAdornmentClass(),
                '& .MuiInputBase-root': {
                    paddingRight: '70px !important',
                    // '& .multi-select-container': {
                    //     display: 'inline-flex',
                    //     overflow: 'hidden',
                    //     flexGrow: 1,
                    //     alignItems: 'flex-start',
                    //     flexWrap: 'wrap'
                    // },
                }
            },
            endAdornment: {

                // position: 'static',
                display: 'flex',
                alignItems: 'center',
                right: '12px !important', // same as inputbase padding right,
                top: '50%',
                transform: 'translateY(-50%)'
            },
            popupIndicator: {
                marginRight: 0,
                padding: 0,
                height: 0
            },
            input: {
                '&:read-only:not(:disabled)': {
                    cursor: 'pointer',
                }
            },
            // popper: {
            //     '&[data-popper-placement=top]': {
            //         '& .MuiPaper-root': {
            //             marginBottom: '8px',
            //         }

            //         // '& .MuiPaper-root': {
            //         //     //boxShadow: dropdownShadow('top'),
            //         //     //0px 0px 1px -2px rgb(0 0 0 / 20%), 0px 0px 2px rgb(0 0 0 / 14%), 0px 0px 5px rgb(0 0 0 / 12%)
            //         //     transform: 'rotateX(180deg)',
            //         //     '& > ul': {
            //         //         transform: 'rotateX(180deg)'
            //         //     }
            //         // }
            //     }
            // },
            clearIndicator: {
                padding: 0
            },

        },
        variants: [
            {
                props: { variant: 'standard' },
                style: {
                    '& .MuiInputBase-root': {
                        '&:not(.Mui-focused):not(.Mui-error)': {
                            '& .MuiAutocomplete-endAdornment': {
                                opacity: 0,
                            },
                            '&:not(.Mui-disabled):hover': {
                                '& .MuiAutocomplete-endAdornment': {
                                    opacity: 1,
                                },
                            }
                        },
                    }
                }
            },
            {
                props: { variant: 'outlined' },
                style: {
                    '& .MuiInputLabel-root': {
                        '&:not(.Mui-focused):not(.MuiFormLabel-filled):not(.force-shrink)': {
                            '& + .MuiInputBase-root': {
                                '& .MuiOutlinedInput-notchedOutline': {
                                    '& legend': {
                                        maxWidth: '0.01px'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            {
                props: { allowFilter: false },  // this makes warning, but works...
                style: {
                    '& .MuiInputBase-root': {
                        cursor: 'pointer'
                    }
                }
            },
            {
                props: { disablePopupIconRotate: true },
                style: {
                    '& .MuiAutocomplete-popupIndicator': {
                        transform: 'unset'
                    }
                }
            },
            {
                props: { shrinkable: true },
                style: ({ ownerState }) => ({
                    '& .MuiInputBase-formControl.MuiInputBase-root': {
                        width: 'unset',
                        minWidth: ownerState.minWidth || 'unset'
                    }
                })
            },
            {
                props: { hasStartIcon: true },
                style: {
                    '& .MuiInputBase-adornedStart': {
                        paddingLeft: 16 + 24 + 8 + 'px !important',
                        '& .leading-icon': {
                            position: 'absolute',
                            left: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)'
                        }
                    }
                }
            }
            // {
            //     props: { disableClearable: false },
            //     style: {
            //         '& .MuiInputBase-root.MuiAutocomplete-inputRoot': {
            //             paddingRight: '70px !important'
            //         }
            //     }
            // },

        ],
        defaultProps: {
            selectOnFocus: false,
            openOnFocus: true
        }
    },
    MuiFormControl: {
        styleOverrides: {
            root: {
                ...hasStartAdornmentClass()
            },
        }
    },
    MuiMenuItem: {
        styleOverrides: {
            root: {
                '&.Mui-selected.MuiButtonBase-root:not(:hover)': {  // not sure for build
                    backgroundColor: 'unset !important'
                },
                '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1) + ' !important'
                },
                '& .MuiTouchRipple-root': {
                    color: theme.palette.primary.main
                },
                '& .selected-adornment': {
                    width: '16px',
                    height: '16px',
                    marginLeft: 'auto',
                    color: theme.palette.secondary.main,
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)'
                },
                '& .start-icon': {
                    color: theme.palette.secondary.dark,
                    marginRight: '6px'
                },
                '& .menu-item-content': {
                    width: '100%',
                    flexGrow: '1',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    paddingRight: '20px',
                    boxSizing: 'border-box',
                    height: '24px',
                    '& .children-content': {
                        display: 'block',
                        maxWidth: '100%',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden'
                    }
                },
                '&.Mui-disabled': {
                    '& .children-content': {
                        color: theme.palette.text.disabled
                    }
                }
            }
        },
        variants: [
            {
                props: { size: 'medium' },
                style: {
                    '&.MuiButtonBase-root': {
                        paddingTop: '12px',
                        paddingBottom: '12px'
                    }
                }
            },
            {
                props: { size: 'small' },
                style: {
                    '&.MuiButtonBase-root': {
                        paddingTop: '8px',
                        paddingBottom: '8px'
                    }
                }
            }
        ],
    },
    MuiPopper: {
        styleOverrides: {
            display: 'none !important'
        }
    },
    MuiCalendarPicker: {
        styleOverrides: {
            root: {
                width: 'min-content'
            }
        }
    },
    MuiYearPicker: {
        styleOverrides: {
            root: {
            width: '256px',
            boxSizing: 'border-box',
            margin: 0,
            paddingLeft: '16px',
            paddingRight: '16px',
            '& .PrivatePickersYear-yearButton': {
                width: '100%',
                height: '32px',
                ...theme.typography.body2,
                borderRadius: '16px',
                padding: '0px',
                color: theme.palette.grey[500],
                '&:hover': {
                    color: theme.palette.primary.main,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1)
                    },
                },
                '& .Mui-selected:hover': {
                    color: theme.palette.white,
                    backgroundColor: theme.palette.blue[700] + ' !important'
                }
            },
        }
    }
}}

const inputVariantStandard = (theme) => ({
        '&:hover': {
            '& .MuiInputBase-root': {
                '&:not(.Mui-disabled):not(.Mui-error):not(.Mui-focused)': {
                    backgroundColor: alpha(theme.palette.secondary.main, 0.1) + ' !important'
                }
            }
        },
        '& .MuiInputBase-root': {
            '&.Mui-error': {
                backgroundColor: theme.palette.red[50]
            },
            '&.Mui-focused': {
                '&:not(.Mui-error)': {
                    backgroundColor: alpha(theme.palette.secondary.main, 0.05)
                }
            }
    }
})

const hasStartAdornmentClass = () => ({
    '&.has-start-adornment': { // TODO: find better independent way
        '& .MuiInputLabel-root': {
            marginLeft: 24 + 8 + 'px',  // start svg width + start svg margin right
            '&:not(.Mui-focused):not(.MuiFormLabel-filled):not(.force-shrink)': {
                '& + .MuiInputBase-root': {
                    '& .MuiOutlinedInput-notchedOutline': {
                        '& legend': {
                            maxWidth: '0.01px'
                        }
                    }
                }
            }
        }
    },
})

function makeAvatarVariants( theme, size, { sizeWithSpacing, borderSize, textFontSize, iconSize }) { return [
    {
        props: { size }, //type: picture
        style: {
            width:  theme.spacing( sizeWithSpacing),
            height: theme.spacing( sizeWithSpacing),
            '&:hover': {
                boxShadow: '0 0 0 '+ borderSize +'px '+ alpha( theme.palette.primary.main, 0.5)
            },
            '&.noHover:hover': {
                boxShadow: 'none',
            },
        }
    },
    {
        props: { size, type: 'text'},
        style: {
            '& .MuiTypography-root': {
                color: theme.palette.primary.main,
                fontSize: textFontSize +'px',
                lineHeight: '1.66',
            },
        }
    },
    {
        props: { size, type: 'icon'},
        style: {
            backgroundColor: theme.palette.grey[50],
            '& svg': {
                height: iconSize +'px',
                width:  iconSize +'px',
                color: theme.palette.secondary.light,
            }
        }
    },
    {
        props: { size, type: 'deletingIcon'},
        style: {
            backgroundColor: theme.palette.red[50],
            '& svg': {
                height: iconSize +'px',
                width:  iconSize +'px',
                color: theme.palette.error.main,
            }
        }
    },
] }

function makeTableCellVariants( theme, size, padding, minHeight) {
    const text_field_css4size = {
        padding,
        minHeight: minHeight,
        minWidth:  minHeight +1 +'px',
        '& .MuiAvatar-root': {
            marginLeft: '-4px',
        }
    }
    return {
    //no variants :((
    [  '& .TextFieldTable.size'   + capitalize( size) +
     ', &.TextFieldTableHead.size'+ capitalize( size)
    ]: {
        ...text_field_css4size
    },

    [  '& .TextFieldTable.size'   + capitalize( size) +'.disablePadding' +
     ', &.TextFieldTableHead.size'+ capitalize( size) +'.disablePadding'
    ]: {
        padding: 0
    },

    //['&.selectRowCheckbox.size'+ capitalize( size) ]: {
    //    minHeight: minHeight,
    //    minWidth:  minHeight +1 +'px',
    //}
    //{
    //    props: { size, type },
    //    style: {
    //        margin: '50px',
    //        '& .TextFieldTable': {
    //        padding,
    //        }
    //    }
    //}
}}
