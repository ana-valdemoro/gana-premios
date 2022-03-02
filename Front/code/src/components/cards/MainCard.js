import PropTypes from 'prop-types';
import { forwardRef } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

// constant
const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 }
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

const MainCard = forwardRef(
  (
    {
      border = true,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle,
      secondary,
      sx = {},
      title,
      subheader,
      ...others
    },
    ref
  ) => {
    const theme = useTheme();

    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          border: border ? '1px solid' : 'none',
          borderColor: theme.palette.primary[200] + 75,
          // ':hover': {
          //   boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
          // },
          ...sx
        }}
      >
        {/* card header and action */}
        {!darkTitle && title && subheader && (
          <CardHeader sx={headerSX} title={title} subheader={subheader} action={secondary} />
        )}
        {darkTitle && title && subheader && (
          <CardHeader
            sx={headerSX}
            title={<Typography variant="h3">{title}</Typography>}
            subheader={<Typography variant="subtitle1">{subheader}</Typography>}
            action={secondary}
          />
        )}

        {/* content & header divider */}
        {title && subheader && <Divider />}

        {/* card content */}
        {content && (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

MainCard.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  children: PropTypes.node,
  content: PropTypes.bool,
  contentClass: PropTypes.string,
  contentSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
  shadow: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
  subheader: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
};

export default MainCard;
