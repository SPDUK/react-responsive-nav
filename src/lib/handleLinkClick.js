import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

// if an anchor tag is uses, redirect on click
// else push to history so we use react router
export default (href, to) => {
  if (!href && !to) throw new ReferenceError(`No href found for this link: href: ${href} to:${to}`);
  if (href) window.location.href = href;
  else history.push(to);
};
