import { IconBaseProps } from 'react-icons/lib';

import { 
    IoPersonAddOutline, 
    IoPersonRemoveOutline, 
    IoTrashBinOutline,
    IoPencilOutline,
    IoCreateOutline,
} from 'react-icons/io5';

export const navItems: Array<{id: string, icon: IconBaseProps, label: string }> = [
    {
        id: 'create',
        icon: <IoCreateOutline />,
        label: 'Create'
    },
    {
        id: 'edit',
        icon: <IoPencilOutline />,
        label: 'Edit',
    },
    {
        id: 'delete',
        icon: <IoTrashBinOutline />,
        label: 'Delete',
    },
    {
        id: 'add',
        icon: <IoPersonAddOutline />,
        label: 'Teacher',
    },
    {
        id: 'remove',
        icon: <IoPersonRemoveOutline />,
        label: 'Teacher',
    },
];