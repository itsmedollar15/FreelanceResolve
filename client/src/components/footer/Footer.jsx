import { useTranslation } from "react-i18next";
import "./Footer.css";

function Footer() {
  const { t } = useTranslation(); // Use i18n hook for translations

  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>{t("footer.categories")}</h2>
            <span>{t("footer.graphicsDesign")}</span>
            <span>{t("footer.digitalMarketing")}</span>
            <span>{t("footer.writingTranslation")}</span>
            <span>{t("footer.videoAnimation")}</span>
            <span>{t("footer.musicAudio")}</span>
            <span>{t("footer.programmingTech")}</span>
          </div>
          <div className="item">
            <h2>{t("footer.support")}</h2>
            <span>{t("footer.helpSupport")}</span>
            <span>{t("footer.trustSafety")}</span>
            <span>{t("footer.sellingOnSSM")}</span>
            <span>{t("footer.buyingOnSSM")}</span>
          </div>
          <div className="item">
            <h2>{t("footer.community")}</h2>
            <span>{t("footer.customerStories")}</span>
            <span>{t("footer.communityHub")}</span>
            <span>{t("footer.forum")}</span>
            <span>{t("footer.events")}</span>
          </div>
          <div className="item">
            <h2>{t("footer.moreFromFreelanceResolve")}</h2>
            <span>{t("footer.frBusiness")}</span>
            <span>{t("footer.frPro")}</span>
            <span>{t("footer.frLogoMaker")}</span>
            <span>{t("footer.frGuides")}</span>
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <h2>{t("footer.freelanceResolve")}</h2>
            <span>
              © {new Date().getFullYear()} {t("footer.freelanceResolveCompany")}
            </span>
          </div>
          <div className="right">
            <div className="social">
              <img src="/icons/twitter.png" alt="Twitter" />
              <img src="/icons/facebook.png" alt="Facebook" />
              <img src="/icons/linkedin.png" alt="LinkedIn" />
              <img src="/icons/pinterest.png" alt="Pinterest" />
              <img src="/icons/instagram.png" alt="Instagram" />
            </div>
            <div className="link">
              <img src="/icons/language.png" alt="Language" />
              <span>{t("footer.language")}</span>
            </div>
            <div className="link">
              <img src="/icons/rupee1.png" alt="Currency" />
              <span>{t("footer.currency")}</span>
            </div>
            <img src="/icons/accessibility.png" alt="Accessibility" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
