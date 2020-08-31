
import React, { useState, useEffect,useRef, useMemo, Fragment } from 'react'
import Logo from "./Logo";
import Nav from "./nav";
import { useScrollPosition } from "../services/helpers/scroll"
import { Affix } from 'antd'
import classNames from 'classnames'
import projectSettings from "../constants/projectSettings"
//import mainMenus from '../constants/mainMenus';
import {categoryList} from "../redux/actions"
import rightMenus from "../constants/rightMenus";
import NavMobile from './navMobile';
//import mobileMenus from '../constants/mobileMenus';
import mobileMenusRight from '../constants/mobileMenusRight';


 

const Header = ({bg, theme, versions, fixed, homeLogo}) => {
    const versionClass = versions.map(el => (`c-header--${el}`)).join(" ")
    const [isFixed, setIsFixed] = useState(false)
    const [show, setIsShow] = useState(true)
    const [isAtTop, setIsAtTop] = useState(true)
   const [hideOnScroll, setHideOnScroll] = useState(true)
   const [mainMenus,setMainMenus]=useState([]);
   const [mobileMenus,setMobileMenus]=useState([]);
  
  useEffect(()=>{
      const getMenu =async()=>{
         const  List = await categoryList();
        const subList = List.map(x=>{
            return {
                    label: x.categorytitle,
                    link: `/category/?cid=${x.categorytitle.toLowerCase()}`,
                    action: "link",
                    as: `/category/${x.categorytitle.toLowerCase()}`,
            }
        });
        subList.push({
            
                label: "Bundles",
                link: "/category/?cid=bundles",
                action: "link",
                as: "/category/bundles",
            
        });
        setMainMenus([{
            label: "Shop",
            link: "/shop",
            subMenus:subList
        }])
        setMobileMenus([{
            label: "Shop",
            link: "/shop",
            action: "link",
            subMenus:subList
        }])
      };
      getMenu(); 
  },mainMenus)
console.log(mainMenus);
   
  useScrollPosition(
    ({ prevPos, currPos }) => {
        let showNav = currPos.y > prevPos.y;
        // console.log(document.body.getBoundingClientRect().top)
        setIsShow(showNav)
        if(currPos.y === -124){
            setIsAtTop(false)
        } else {
            setIsAtTop(true)
        }
         
        
      const isShow = currPos.y > prevPos.y
      if (isShow !== hideOnScroll) setHideOnScroll(isShow)
    },
    [hideOnScroll],
    false,
    false,
    300
  )
    const logoVersion =  homeLogo ? [] : ["non-home"]
 
    if(fixed){

    return (
        <div>
        
            <div className={classNames("c-header__wrapper", {
                "c-header__wrapper--hidden": !show && !fixed,
            })}>
                
                <script src={`https://maps.googleapis.com/maps/api/js?key=${projectSettings.googleApiKey}&libraries=places`} async defer></script>
                <header onScroll={(e) => {
                }}  className={classNames(" c-header", {
                    "c-header--light": true,
                    "c-header--fixed": true && !fixed,
                    "c-header--pinned": isFixed || bg,
                    ["c-header--"+theme]: theme,
                    [versionClass]: versions
                })}> 
                        <NavMobile parent="c-header" items={mobileMenus} />
                        <Nav parent="c-header" items={mainMenus} />
                        <Logo parent="c-header" text={!homeLogo} versions={logoVersion} />
                        <Nav parent="c-header" isRight={true} items={rightMenus} />
                        <NavMobile parent="c-header" onlyCart={true} items={mobileMenusRight} />   
                </header>
            </div>
      
        </div>
    )} else {
        return (
            <div>
             <Affix className="c-header__affix"  >
                <div className={classNames("c-header__wrapper", {
                    "c-header__wrapper--hidden": !show && !fixed,
                })}>
                    <script src={`https://maps.googleapis.com/maps/api/js?key=${projectSettings.googleApiKey}&libraries=places`} async defer></script>
                    <header onScroll={(e) => {
                    }}  className={classNames(" c-header", {
                        "c-header--light": true,
                        "c-header--fixed": true && !fixed,
                        "c-header--pinned": isFixed || bg,
                        ["c-header--"+theme]: theme,
                        [versionClass]: versions
                    })}> 
                            <NavMobile parent="c-header" items={mobileMenus} />
                            <Nav parent="c-header" items={mainMenus} />
                            <Logo parent="c-header" text={!homeLogo} versions={logoVersion} />
                            <Nav parent="c-header" isRight={true} items={rightMenus} />
                            <NavMobile parent="c-header" onlyCart={true} items={mobileMenusRight} />
                    </header>
                </div>
            </Affix>
            </div>
        )
    }
}

Header.defaultProps = {
    bg: false,
    versions: []
}


const headMeta = {}


export default Header