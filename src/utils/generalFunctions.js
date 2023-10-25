import {
  ClipboardDocumentIcon, Cog6ToothIcon, ComputerDesktopIcon,
  DocumentTextIcon,
  Squares2X2Icon,
  UserIcon,
  UsersIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline/index.js";
import {AdjustmentsVerticalIcon} from "@heroicons/react/20/solid/index.js";
import toast from "react-hot-toast";

export const sideBarOptions = [
  {
    id: 1,
    title: 'Dashboard',
    icon: Squares2X2Icon,
    url: '/dashboard'
  },
  {
    id: 2,
    title: 'Waiver Templates',
    icon: DocumentTextIcon,
    url: '/templates',
    subList: [
      {
        id: 3,
        title: 'Templates 1',
      },
      {
        id: 4,
        title: 'Templates 2',
      }
    ]
  },
  {
    id: 5,
    title: 'Signed Waivers',
    url: '/signed',
    icon: ClipboardDocumentIcon
  },
  {
    id: 6,
    title: 'Template Gallery',
    url: '/gallery',
    icon: UsersIcon,
    subList: [
      {
        id: 7,
        title: 'Templates 1',
      },
      {
        id: 8,
        title: 'Templates 2',
      }
    ]
  },
  {
    id: 9,
    title: 'Customers',
    url: '/customers',
    icon: UserIcon
  },
  {
    id: 10,
    title: 'Kiosk Settings',
    url: '/kiosk',
    icon: ComputerDesktopIcon
  },
  {
    id: 16,
    title: 'Staff Management',
    url: '/management',
    icon: UsersIcon
  },
  {
    id: 11,
    title: 'Settings',
    url: '/settings',
    icon: Cog6ToothIcon,
    subList: [
      {
        id: 13,
        title: 'Account',
        url: '/settings'
      },
      {
        id: 14,
        title: 'Password',
        url: '/settings/password'
      },
      {
        id: 15,
        title: 'Integrations',
        url: '/settings/integrations'
      }
    ]
  },
  {
    id: 12,
    title: 'Billing',
    url: '/billing',
    icon: AdjustmentsVerticalIcon
  },
  {
    id: 17,
    title: 'Sign Out',
    url: '#',
    icon: ArrowRightOnRectangleIcon
  }
];

export function generateMonths(number) {
  const months = ['Month'];
  for (let i = 1; i <= number; i++) {
    months.push(i);
  }

  return months;
}

export function generateYears(startingYear) {
  const currentYear = new Date().getFullYear();
  const years = ['Year'];
  for (let year = startingYear; year <= currentYear; year++) {
    years.push(year);
  }
  return years;
}

export const DashBoardHeaders = ['ID', 'Signed Date', 'First Name', 'Last Name', 'Reference No', 'Template Name', 'Status'];

export const dashboardData = [{
  _id: '1111111',
  signedDate: 'Oct 05, 2023',
  firstName: 'John',
  lastName: 'Doe',
  refrenceNo: 'SPARKO',
  templateName: 'Lorem',
  status: 'Submitted'
}]

export function limitChars(str, number) {
  return str.slice(0, number) + '...';
}

export const countries = ["Pakistan", "Germany", "United States", "United Kingdom", "France", "Australia", "Canada", "Japan"];

export const billingOptions = [{
  plan: 'Growth',
  firstChar: {
    title: 'For the first 1 - 550', price: 'Flat USD45'
  },
  secondChar: {
    title: '550 - Rest Per Unit', price: 'USD0.09'
  }
}, {
  plan: 'Free',
  firstChar: {
    title: 'For All Per Unit', price: 'USD0.15'
  }
}, {
  plan: 'Basic',
  firstChar: {
    title: 'For the first 1 - 150', price: 'Flat USD10'
  },
  secondChar: {
    title: '150 - Rest Per Unit', price: 'USD0.1'
  }
}, {
  plan: 'Standard',
  firstChar: {
    title: 'For the first 1 - 1050', price: 'Flat USD89'
  },
  secondChar: {
    title: '1050 - Rest Per Unit', price: 'USD0.09'
  }
}, {
  plan: 'Enterprise Pro',
  firstChar: {
    title: 'For the first 1 - 5050', price: 'Flat USD199'
  },
  secondChar: {
    title: '5050 - Rest Per Unit', price: 'USD0.04'
  }
}, {
  plan: 'Enterprise',
  firstChar: {
    title: 'For the first 1 - 2550', price: 'Flat USD125'
  },
  secondChar: {
    title: '2550 - Rest Per Unit', price: 'USD0.05'
  }
}]

export const invoiceData = [
  {
    id: 1,
    invoice: 'B8DAA400-0001',
    period: 'Oct 04, 2023 - Oct 04, 2023',
    total: '$0 USD',
    status: 'Paid'
  }
]
export const customerData = [
  {
    _id: '11111111', firstName: 'John', lastName: 'Doe', email: 'john@gmail.com', count: 1
  }, {
    _id: '21111111', firstName: 'John', lastName: 'Doe', email: 'john@gmail.com', count: 1
  }
]

export const managementData = [
  {
    _id: '11111111', count: 1, name: 'John'
  }, {
    _id: '21111111', count: 1, name: 'John'
  }
]

export function isValidBody(body) {
  const invalidFields = [];

  for (const key in body) {
    if (body.hasOwnProperty(key) && typeof body[key] === 'string') {
      if (body[key].trim() === '') {
        invalidFields.push(key);
      }
    }
  }

  if (invalidFields.length > 0) {
    toast.error(`Invalid input at ${invalidFields[0]}`)
    return false;
  }

  return true;
}

export const teamData = [
  {id:1, name:'John', email:'john@email.com'}
]
export function isEmptyObject(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false; // If the object has any own property, it's not empty
    }
  }
  return true; // If the loop completes without finding any own properties, it's empty
}