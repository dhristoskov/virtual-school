import { IconBaseProps } from 'react-icons/lib';

import { 
    IoPersonAddOutline, 
    IoPersonRemoveOutline, 
    IoTrashBinOutline,
    IoPencilOutline,
} from 'react-icons/io5';

export const iconSwicher = (icon: string):IconBaseProps | undefined => {
    switch(icon) {
        case 'delete': return <IoTrashBinOutline />
        case 'edit': return <IoPencilOutline />
        case 'add': return <IoPersonAddOutline />
        case 'remove': return <IoPersonRemoveOutline />
    }
}
