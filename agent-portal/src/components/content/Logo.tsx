import BranchLogo from "../../assets/branch-logo.png";
const Logo = () => {
    return (
        <div className="flex">
            <img alt="Branch Int'l" className="mr-1 h-6 sm:h-9" src={BranchLogo} />
        </div>
    );
};

export default Logo;
