import { FileCog, MonitorCog, Settings, UserCog } from "lucide-react";
import '../../styles/pages/admin.scss'

interface SidebarProps {
    setSelectedComponent: (component: string) => void;
}

const Sidebar= ({ setSelectedComponent }:SidebarProps ) => {
    return (
        <div className="sidebar">
            <div className="sidebar-heading">
                <Settings size="18px"/>
                <h2>Administration</h2>
            </div>
            <ul>
                <li className="border-top-bottom" onClick={() => setSelectedComponent('products')}><MonitorCog size={16} /> Produkter</li>
                <li onClick={() => setSelectedComponent('customers')}><UserCog size={16} /> Kunder</li>
                <li onClick={() => setSelectedComponent('orders')}><FileCog size={16} /> Beställningar</li>
            </ul>
        </div>
    );
};

export default Sidebar;