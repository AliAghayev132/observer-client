import styles from "./Footer.module.css";

export const Footer = () => {
    return (
        <footer className={styles.footer2}>
            <div className={styles.footer2Top}>
                <div className={styles.footer2Cols}>
                    <div className={styles.footer2Col}>
                        <h4>Product</h4>
                        <ul>
                            <li><a href="#">Landing Page</a></li>
                            <li><a href="#">Popup Builder</a></li>
                            <li><a href="#">Web-design</a></li>
                            <li><a href="#">Content</a></li>
                            <li><a href="#">Integrations</a></li>
                        </ul>
                    </div>
                    <div className={styles.footer2Col}>
                        <h4>Use Cases</h4>
                        <ul>
                            <li><a href="#">Web-designers</a></li>
                            <li><a href="#">Marketers</a></li>
                            <li><a href="#">Small Business</a></li>
                            <li><a href="#">Website Builder</a></li>
                        </ul>
                    </div>
                    <div className={styles.footer2Col}>
                        <h4>Resources</h4>
                        <ul>
                            <li><a href="#">Academy</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Themes</a></li>
                        </ul>
                    </div>
                    <div className={styles.footer2Col}>
                        <h4>Company</h4>
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">FAQs</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className={styles.footer2Divider} />
            <div className={styles.footer2Bottom}>
                <ul className={styles.footer2Links}>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms of Use</a></li>
                    <li><a href="#">Sales and Refunds</a></li>
                    <li><a href="#">Legal</a></li>
                </ul>
            </div>
        </footer>
    )
}