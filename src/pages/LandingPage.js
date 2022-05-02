// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../customComponents/Page';
import {
  LandingHero,
  LandingMinimal,
  LandingPricingPlans,
  LandingCleanInterfaces,
  LandingHugePackElements, PageNotFound
} from '../components/_external-pages/landing';
import EmailPage from "../components/_external-pages/landing/LandingPageEmail";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <RootStyle title="The starting point for your next Simulation | Cohere" id="move_top">
      <LandingHero />
      <ContentStyle>
        <LandingMinimal />
        {/*<LandingHugePackElements />*/}
        {/*<LandingCleanInterfaces />*/}
        {/*<LandingPricingPlans />*/}
        {/*<PageNotFound/>*/}
        <EmailPage/>
      </ContentStyle>
    </RootStyle>
  );
}
