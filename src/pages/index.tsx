import { ReactNode } from 'react'
import { useRouter } from 'next/router'

import useAppSettings from '@/application/common/useAppSettings'
import { useHomeInfo } from '@/application/homeInfo'
import Button from '@/components/Button'
import Card from '@/components/Card'
import Col from '@/components/Col'
import Grid from '@/components/Grid'
import Icon from '@/components/Icon'
import Image from '@/components/Image'
import Link from '@/components/Link'
import NumberJelly from '@/components/NumberJelly'
import Row from '@/components/Row'
import Tooltip from '@/components/Tooltip'
import linkTo from '@/functions/dom/linkTo'
import useDocumentMetaTitle from '@/hooks/useDocumentMetaTitle'
import { useDocumentScrollActionDetector } from '@/hooks/useScrollActionDetector'

function HomePageContainer({ children }: { children?: ReactNode }) {
  useDocumentScrollActionDetector()
  useDocumentMetaTitle('MakiDEX')
  return (
    <div
      className="flow-root overflow-x-hidden"
      style={{
        backgroundColor: '#141041',
        backgroundImage: "url('/backgroundImages/home-page-bg-lights.webp')",
        backgroundSize: '100% 95%',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {children}
    </div>
  )
}

function HomePageNavbar() {
  const isMobile = useAppSettings((s) => s.isMobile)
  const { push } = useRouter()
  return (
    <Row className="justify-between mobile:justify-center py-12 px-[min(160px,8vw)]">
      <Image src="/logo/dex_logo.png" className="w-1/6" />
      {!isMobile && (
        <Button
          className="frosted-glass-teal"
          onClick={() => {
            push('/swap')
          }}
        >
          Launch app
        </Button>
      )}
    </Row>
  )
}

function HomePageSection0() {
  const isMobile = useAppSettings((s) => s.isMobile)
  const { push } = useRouter()
  const { tvl, totalvolume } = useHomeInfo()
  return (
    <section className="grid-child-center grid-cover-container mb-16 relative">
      {/* <Image src="/backgroundImages/home-bg-element-1.png" className="w-[744px] mobile:w-[394px]" style={{visibility:'hidden'}} /> */}
      <div className="grid-cover-content children-center">
        <div className="font-light text-[64px] mobile:text-[30px] text-white mb-4 mt-14 mobile:mt-9 leading-[60px] mobile:leading-[32px]">
          A pathway for <br />
          the advancement of{' '}
          <span
            className="font-bold text-transparent bg-clip-text"
            style={{
              background: 'radial-gradient(circle at top right,#39d0d8,#2b6aff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text'
            }}
          >
            DeFi
          </span>
        </div>
        <div className="font-normal text-xl mobile:text-base text-[#adc6ff] mb-6">
          <b>Swaps</b> at the speed of light. Unprecedented <b>liquidity</b>. {isMobile ? <br /> : ''} Seamless{' '}
          <b>yield</b> generation.
        </div>
        {/* two button */}
        <Row className="gap-8 mobile:gap-4 mb-16 mobile:mb-6 grid grid-cols-2-fr">
          <Button
            className="home-rainbow-button-bg text-white mobile:text-xs px-5 mobile:px-4"
            onClick={() => {
              push('/swap')
            }}
          >
            <Row className="items-center gap-2">
              <div>Launch app</div>
              <Icon heroIconName="chevron-right" size="xs" />
            </Row>
          </Button>

          <Button
            className="frosted-glass-teal text-white mobile:text-xs px-5 mobile:px-4 forsted-blur"
            onClick={() => {
              linkTo('https://makiso.gitbook.io/maki')
            }}
          >
            <Row className="items-center gap-2">
              <div>Read docs</div>
              <Icon iconSrc="/icons/gitbook.svg" size="sm" />
            </Row>
          </Button>
        </Row>
        {/* two panels */}
        <Row className="gap-6 mobile:gap-3 mb-9 grid grid-cols-2-fr">
          <Card className="frosted-glass-smoke forsted-blur-sm rounded-3xl mobile:rounded-2xl p-6 mobile:py-3 mobile:px-6 mobile:min-w-[156px] min-w-[250px] tablet:min-w-[250px]">
            <div className="text-sm text-[#adc6ff] mb-1 mobile:text-[8px]">TOTAL VALUE LOCKED</div>
            {/* value */}
            <Row className="justify-center text-xl mobile:text-xs font-normal text-white tracking-widest mobile:tracking-wider">
              <div className="mr-1">$</div>
              {tvl && (
                <NumberJelly
                  fractionLength={0}
                  eachLoopDuration={400}
                  totalDuration={8 * 60 * 1000}
                  maxDeltaPercent={0.05}
                  currentValue={tvl}
                  initValue={tvl ? 0.999 * tvl : undefined}
                />
              )}
            </Row>
          </Card>

          <Card className="frosted-glass-smoke forsted-blur-sm rounded-3xl mobile:rounded-2xl p-6 mobile:py-3 mobile:px-6 mobile:min-w-[156px] min-w-[250px] tablet:min-w-[250px]">
            <div className="text-sm text-[#adc6ff] mb-1 mobile:text-[8px]">TOTAL TRADING VOLUME</div>
            {/* value */}
            <Row className="justify-center text-xl mobile:text-xs font-normal text-white tracking-widest mobile:tracking-wider">
              <div className="mr-1">$</div>
              {totalvolume && (
                <NumberJelly
                  fractionLength={0}
                  eachLoopDuration={200}
                  totalDuration={8 * 60 * 1000}
                  maxDeltaPercent={0.05}
                  currentValue={totalvolume}
                  initValue={totalvolume ? 0.999 * totalvolume : undefined}
                />
              )}
            </Row>
          </Card>
        </Row>
        <Image src="/logo/build-on-slogan.svg" className="transform mobile:scale-75" />
      </div>
    </section>
  )
}

function HomePageSection1() {
  const { push } = useRouter()
  return (
    <section
      className="grid-child-center overflow-hidden relative mx-auto tablet:mx-5 px-24 tablet:p-8 max-w-[1320px] min-h-[506px] hidden rounded-[100px] mobile:rounded-[40px]"
      // style={{
      //   background:
      //     "radial-gradient(at center top, transparent 20%, hsl(245, 60%, 16%, 0.2)), url('/backgroundImages/home-page-section1-light.webp'), #1b1659",
      //   boxShadow:
      //     '8px 8px 10px rgba(20, 16, 65, 0.05), -8px -8px 10px rgba(197, 191, 255, 0.05), inset 0 6px 20px rgba(197, 191, 255, 0.2), inset 0 -1px 25px rgba(197, 191, 255, 0.1)',
      //   backgroundSize: '100% 100%'
      // }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          visibility: 'hidden',
          background: 'linear-gradient(245.22deg, #da2eef 7.97%, #2b6aff 49.17%, #39d0d8 92.1%)',
          maskImage: "url('/backgroundImages/home-bg-element-2.png')",
          WebkitMaskImage: "url('/backgroundImages/home-bg-element-2.png')",
          maskSize: 'cover',
          WebkitMaskSize: 'cover'
        }}
      />
      <div>
        <div className="mb-8">
          <div
            className="w-10 h-px my-2 mx-auto rounded-full"
            style={{ background: 'radial-gradient(39.84% 47.5% at 96.82% 58.33%, #39d0d8 0%, #2b6aff 100%)' }}
          />

          <div className="text-lg">A suite of features powering the evolution of DeFi on Solana</div>
        </div>

        <Grid className="gap-5 grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1">
          <Card className="flex-1 children-center frosted-glass-lightsmoke forsted-blur-sm py-6 px-12 rounded-3xl">
            <div className="frosted-glass-teal p-3 mb-3 rounded-xl">
              <Icon iconSrc="/icons/home-trade.svg" />
            </div>
            <div className="font-semibold text-lg text-white mb-2">Trade</div>
            <div className="font-light text-sm text-[#c4d6ff] mb-5">Exchange or transact swiftly and economically</div>
            <Button
              className="frosted-glass-teal"
              onClick={() => {
                push('/swap')
              }}
            >
              Enter Exchange
            </Button>
          </Card>

          <Card className="flex-1 children-center frosted-glass-lightsmoke forsted-blur-sm py-6 px-12 rounded-3xl">
            <div className="frosted-glass-teal p-3 mb-3 rounded-xl">
              <Icon iconSrc="/icons/home-yield.svg" />
            </div>
            <div className="font-semibold text-lg text-white mb-2">Yield</div>
            <div className="font-light text-sm text-[#c4d6ff] mb-5">
              Generate income via transaction fees and yield farming.
            </div>
            <Button
              className="frosted-glass-teal"
              onClick={() => {
                push('/farms')
              }}
            >
              Enter Farms
            </Button>
          </Card>

          <Card className="flex-1 children-center frosted-glass-lightsmoke forsted-blur-sm py-6 px-12 rounded-3xl">
            <div className="frosted-glass-teal p-3 mb-3 rounded-xl">
              <Icon iconSrc="/icons/home-pool.svg" />
            </div>
            <div className="font-semibold text-lg text-white mb-2">Pool</div>
            <div className="font-light text-sm text-[#c4d6ff] mb-5">Provide liquidity for any SPL token.</div>
            <Button
              className="frosted-glass-teal"
              onClick={() => {
                push('/liquidity/add')
              }}
            >
              Add Liquidity
            </Button>
          </Card>

          {/* H2W : Disable AcceleRator */}
          {/* 
            <div className="frosted-glass-teal p-3 mb-3 rounded-xl">
              <Icon iconSrc="/icons/home-acceleraytor.svg" />
            </div>
            <div className="font-semibold text-lg text-white mb-2">AcceleRaytor</div>
            <div className="font-light text-sm text-[#c4d6ff] mb-5">Launchpad for new Solana projects.</div>
            <Button
              className="frosted-glass-teal"
              onClick={() => {
                push('https://v1.raydium.io/acceleRaytor')
              }}
            >
              View Projects
            </Button>
          </Card>
            */}
        </Grid>
      </div>
    </section>
  )
}

function HomePageSection2() {
  const isMobile = useAppSettings((s) => s.isMobile)
  const isTablet = useAppSettings((s) => s.isTablet)

  return (
    <section className="grid-child-center grid-cover-container">
      <div
        className="w-screen h-full"
        style={{
          visibility: 'hidden',
          background:
            isMobile || isTablet
              ? "url('/backgroundImages/home-bg-element-4.png') 0% 0% / 100% 100%"
              : "url('/backgroundImages/home-bg-element-3.png') 0% 0% / 100% 100%"
        }}
      />
      <div className="max-w-[1220px] px-14 tablet:px-4 mt-28 mx-16 tablet:mx-4 mb-44">
        <div className="mb-8">
          <div
            className="w-10 h-px my-2 mx-auto rounded-full"
            style={{ background: 'radial-gradient(39.84% 47.5% at 96.82% 58.33%, #39d0d8 0%, #2b6aff 100%)' }}
          />
          <div className="text-lg">
            MakiDEX delivers Wide-Ranging Liquidity across the ecosystem to both users and projects.
          </div>
        </div>

        <Grid className="gap-6 grid-cols-3 tablet:grid-cols-1 mobile:grid-cols-1 justify-items-center">
          <Card
            className="max-w-[356px] grid children-center frosted-glass-smoke  forsted-blur-sm py-6 px-10 rounded-3xl"
            style={{
              gridTemplateRows: 'auto auto 1fr',
              alignItems: 'normal'
            }}
          >
            <div className="frosted-glass-teal p-3 mb-3 rounded-xl">
              <Icon iconSrc="/icons/home-order-book-AMM.svg" />
            </div>
            <div className="font-semibold text-lg text-white mb-2">Order Book AMM</div>
            <div className="font-light text-[#c4d6ff] mb-5">
              MakiDEX{"'"}s AMM interacts with OpenBook{"'"}s central limit order book, ensuring pools can access
              OpenBook's full order flow and liquidity, and vice versa.
            </div>
          </Card>

          <Card
            className="max-w-[356px] grid children-center frosted-glass-smoke  forsted-blur-sm py-6 px-10 rounded-3xl"
            style={{
              gridTemplateRows: 'auto auto 1fr',
              alignItems: 'normal'
            }}
          >
            <div className="frosted-glass-teal p-3 mb-3 rounded-xl">
              <Icon iconSrc="/icons/home-yield.svg" />
            </div>
            <div className="font-semibold text-lg text-white mb-2">Best Price Swaps</div>
            <div className="font-light text-[#c4d6ff] mb-5">
              MakiDEX determines the best swap route among all pools in order to provide the best price for users, and
              executes accordingly.
            </div>
          </Card>

          <Card
            className="max-w-[356px] grid children-center frosted-glass-smoke  forsted-blur-sm py-6 px-10 rounded-3xl"
            style={{
              gridTemplateRows: 'auto auto 1fr',
              alignItems: 'normal'
            }}
          >
            <div className="frosted-glass-teal p-3 mb-3 rounded-xl">
              <Icon iconSrc="/icons/home-pool.svg" />
            </div>
            <div className="font-semibold text-lg text-white mb-2">Premissionless Liquidity</div>
            <div className="font-light text-[#c4d6ff] mb-5">
              MakiDEX enables the permissionless creation of liquidity pools and farms so projects can launch and
              bootstrap liquidity in a decentralized manner.
            </div>
          </Card>
        </Grid>
      </div>
    </section>
  )
}

function HomePageSection3() {
  return (
    <section className="children-center mb-24">
      <div className="mb-8">
        <div className="text-lg">Partners</div>
        <div
          className="w-10 h-px my-2 mx-auto rounded-full"
          style={{ background: 'radial-gradient(39.84% 47.5% at 96.82% 58.33%, #39d0d8 0%, #2b6aff 100%)' }}
        />
      </div>
      <Row className="w-full justify-around px-56 tablet:px-0 mobile:px-0 tablet:grid mobile:grid gap-16 gap-y-4">
        <Image src="/logo/solana-text-logo.svg" />
        <Image src="/logo/serum-text-logo.svg" />
      </Row>
    </section>
  )
}

function HomePageFooter() {
  const isMobile = useAppSettings((s) => s.isMobile)
  const isTablet = useAppSettings((s) => s.isTablet)
  return (
    <footer
      className="pt-56 overflow-hidden"
      style={{
        background:
          isTablet || isMobile
            ? "url('/backgroundImages/home-footer-bg.webp') 0 0 / auto 100%"
            : "url('/backgroundImages/home-footer-bg.webp') 0 0 / 100% 100%"
      }}
    >
      <Grid className="mobile:gap-14 justify-around px-[10%] grid-cols-3 tablet:grid-cols-3 mobile:grid-cols-1 gap-16 gap-y-4">
        <div>
          <div className="mb-8">
            <div className="text-sm mb-3 tablet:text-center">ABOUT</div>
            <div
              className="w-6 h-px my-2 rounded-full tablet:mx-auto"
              style={{ background: 'radial-gradient(39.84% 47.5% at 96.82% 58.33%, #39d0d8 0%, #2b6aff 100%)' }}
            />
          </div>
          <Col className="gap-6">
            <Link className="text-[#c4d6ff] hover:text-white tablet:text-center" href="https://makiso.gitbook.io/maki/">
              Documentation
            </Link>
            <Link className="text-[#c4d6ff] hover:text-white tablet:text-center" href="https://coinmarketcap.com/">
              CoinMarketCap
            </Link>
            <Link className="text-[#c4d6ff] hover:text-white tablet:text-center" href="https://www.coingecko.com/">
              CoinGecko
            </Link>
            {/* <Link openInNewTab className="text-[#c4d6ff] hover:text-white tablet:text-center" href="">
              Disclaimer
            </Link> */}
          </Col>
        </div>

        {/* <div>
          <div className="mb-8">
            <div className="text-sm mb-3 tablet:text-center">PROTOCOL</div>
            <div
              className="w-6 h-px my-2 rounded-full tablet:mx-auto"
              style={{ background: 'radial-gradient(39.84% 47.5% at 96.82% 58.33%, #39d0d8 0%, #2b6aff 100%)' }}
            />
          </div>
          <Col className="gap-6">
            <Link className="text-[#c4d6ff] hover:text-white tablet:text-center" href="">
              Apply for DropZone
            </Link>
            <Link className="text-[#c4d6ff] hover:text-white tablet:text-center" href="">
              Apply for Fusion Pool
            </Link>
            <Link className="text-[#c4d6ff] hover:text-white tablet:text-center" href="">
              Apply for AcceleRaytor
            </Link>
            <Link className="text-[#c4d6ff] hover:text-white tablet:text-center" href="">
              Permissionless Pool
            </Link>
          </Col>
        </div> */}

        <div>
          <div className="mb-8">
            <div className="text-sm mb-3 tablet:text-center">SUPPORT</div>
            <div
              className="w-6 h-px my-2 rounded-full tablet:mx-auto"
              style={{ background: 'radial-gradient(39.84% 47.5% at 96.82% 58.33%, #39d0d8 0%, #2b6aff 100%)' }}
            />
          </div>
          <Col className="gap-6">
            <Link className="text-[#c4d6ff] hover:text-white tablet:text-center" href="https://makiso.gitbook.io/maki/">
              Getting Started on MakiDEX
            </Link>
            <Link className="text-[#c4d6ff] hover:text-white tablet:text-center" href="https://makiso.gitbook.io/maki/getting-started/faq">
              FAQ
            </Link>
          </Col>
        </div>

        <div className="tablet:col-span-full tablet:justify-self-center">
          <div className="mb-8 tablet:hidden">
            <div className="text-sm mb-3">COMMUNITY</div>
            <div
              className="w-6 h-px my-2 rounded-full"
              style={{ background: 'radial-gradient(39.84% 47.5% at 96.82% 58.33%, #39d0d8 0%, #2b6aff 100%)' }}
            />
          </div>
          <Grid className="flex flex-col tablet:flex-row gap-6 tablet:gap-10">
            <Link className="text-[#c4d6ff] hover:text-white" href="https://twitter.com/makiswap">
              <Row className="items-center gap-2">
                <Icon
                  className="frosted-glass-teal p-1.5 rounded-lg text"
                  iconClassName="w-5 h-5 tablet:w-6 tablet:h-6"
                  iconSrc="icons/media-twitter.svg"
                />
                <div className="tablet:hidden">Twitter</div>
              </Row>
            </Link>
            <Link className="text-[#c4d6ff] hover:text-white" href="http://makiswap.medium.com/">
              <Row className="items-center gap-2">
                <Icon
                  className="frosted-glass-teal p-1.5 rounded-lg text"
                  iconClassName="w-5 h-5 tablet:w-6 tablet:h-6"
                  iconSrc="icons/media-medium.svg"
                />
                <div className="tablet:hidden">Medium</div>
              </Row>
            </Link>
            <Link className="text-[#c4d6ff] hover:text-white" href="https://discord.gg/CeWJwHn2Qn">
              <Row className="items-center gap-2">
                <Icon
                  className="frosted-glass-teal p-1.5 rounded-lg text"
                  iconClassName="w-5 h-5 tablet:w-6 tablet:h-6"
                  iconSrc="icons/media-discord.svg"
                />
                <div className="tablet:hidden">Discord</div>
              </Row>
            </Link>
            <Row className="items-center gap-2">
              {/* <Tooltip triggerBy="click" placement={isTablet || isMobile ? 'left' : 'right'}> */}

              <Link className="text-[#c4d6ff] hover:text-white" href="https://t.me/makiswap">
                <Row className="items-center gap-2">
                  <Icon
                    className="frosted-glass-teal p-1.5 rounded-lg text"
                    iconClassName="w-5 h-5 tablet:w-6 tablet:h-6"
                    iconSrc="/icons/media-telegram.svg"
                  />
                  <div className="tablet:hidden">Telegram</div>
                </Row>
              </Link>

              {/* <Row className="text-[#c4d6ff] hover:text-white items-center gap-1 cursor-pointer">
                <Icon
                  className="frosted-glass-teal p-1.5 rounded-lg text"
                  iconClassName="w-5 h-5 tablet:w-6 tablet:h-6"
                  iconSrc="/icons/media-telegram.svg"
                />
                <div className="tablet:hidden">Telegram</div>
                { <Icon size="sm" heroIconName="chevron-down" /> }
              </Row> */}
              {/* <Tooltip.Panel>
                  <Col className="divide-y-1.5">
                    <Link
                      className="border-[rgba(196,214,255,0.1)] text-[#c4d6ff] hover:text-white p-2 whitespace-nowrap text-sm"
                      href="https://t.me/raydiumprotocol"
                    >
                      Telegram (EN)
                    </Link>
                    <Link
                      className="border-[rgba(196,214,255,0.1)] text-[#c4d6ff] hover:text-white p-2 whitespace-nowrap text-sm"
                      href="https://t.me/RaydiumChina"
                    >
                      Telegram (CN)
                    </Link>
                    <Link
                      className="border-[rgba(196,214,255,0.1)] text-[#c4d6ff] hover:text-white p-2 whitespace-nowrap text-sm"
                      href="https://t.me/raydiumkorea"
                    >
                      Telegram (KR)
                    </Link>
                    <Link
                      className="border-[rgba(196,214,255,0.1)] text-[#c4d6ff] hover:text-white p-2 whitespace-nowrap text-sm"
                      href="https://t.me/raydiumjapan"
                    >
                      Telegram (JP)
                    </Link>
                    <Link
                      className="border-[rgba(196,214,255,0.1)] text-[#c4d6ff] hover:text-white p-2 whitespace-nowrap text-sm"
                      href="https://t.me/RaydiumSpanish"
                    >
                      Telegram (ES)
                    </Link>
                    <Link
                      className="border-[rgba(196,214,255,0.1)] text-[#c4d6ff] hover:text-white p-2 whitespace-nowrap text-sm"
                      href="https://t.me/RaydiumTurkey"
                    >
                      Telegram (TR)
                    </Link>
                    <Link
                      className="border-[rgba(196,214,255,0.1)] text-[#c4d6ff] hover:text-white p-2 whitespace-nowrap text-sm"
                      href="https://t.me/RaydiumVietnam"
                    >
                      Telegram (VN)
                    </Link>
                    <Link
                      className="border-[rgba(196,214,255,0.1)] text-[#c4d6ff] hover:text-white p-2 whitespace-nowrap text-sm"
                      href="https://t.me/RaydiumRussian"
                    >
                      Telegram (RU)
                    </Link>
                    <Link
                      className="border-[rgba(196,214,255,0.1)] text-[#c4d6ff] hover:text-white p-2 whitespace-nowrap text-sm"
                      href="https://t.me/raydiumthailand"
                    >
                      Telegram (TH)
                    </Link>
                  </Col>
                </Tooltip.Panel> */}
              {/* </Tooltip> */}
            </Row>
          </Grid>
        </div>
      </Grid>

      <Image className="mx-auto p-20 transform scale-125 pointer-events-none w-1/6" src="/logo/dex_logo.png" />
    </footer>
  )
}

export default function HomePage() {
  return (
    <HomePageContainer>
      <HomePageNavbar />
      <HomePageSection0 />
      <HomePageSection1 />
      <HomePageSection2 />
      <HomePageFooter />
    </HomePageContainer>
  )
}
