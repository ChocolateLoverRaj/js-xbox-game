using Microsoft.Web.WebView2.Core;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.ApplicationModel.Resources.Core;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.Storage;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;
using Windows.UI.Popups;
using System.Diagnostics;

// The Blank Page item template is documented at https://go.microsoft.com/fwlink/?LinkId=402352&clcid=0x409

namespace Test_UWP_For_Xbox
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class MainPage : Page
    {
        public MainPage()
        {
            this.InitializeComponent();
            LoadWebview2();
        }

        private async void LoadWebview2()
        {
            await webView2.EnsureCoreWebView2Async();
            webView2.CoreWebView2.SetVirtualHostNameToFolderMapping("virtual", "", CoreWebView2HostResourceAccessKind.Allow);
            webView2.CoreWebView2.NavigationCompleted += (s, e) => {
                webView2.CoreWebView2.PostWebMessageAsString("hi");
            };
            webView2.CoreWebView2.WebMessageReceived += async (s, e) =>
            {
                await new MessageDialog(e.TryGetWebMessageAsString()).ShowAsync();
                Debug.WriteLine("Done showing dialog async");
            };
            webView2.CoreWebView2.Navigate("https://virtual/Assets/html/index.html");
        }
    }
}
