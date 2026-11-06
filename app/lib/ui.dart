import 'package:flutter/material.dart';

class FolkColors {
  static const green = Color(0xFF58CC02);
  static const greenDark = Color(0xFF58A700);
  static const greenLight = Color(0xFFD7FFB8);
  static const orange = Color(0xFFFF9600);
  static const orangeDark = Color(0xFFD97A00);
  static const orangeLight = Color(0xFFFFF0D9);
  static const blue = Color(0xFF1CB0F6);
  static const blueLight = Color(0xFFDDF4FF);
  static const yellow = Color(0xFFFFC800);
  static const yellowLight = Color(0xFFFFF6CC);
  static const red = Color(0xFFFF4B4B);
  static const ink = Color(0xFF4B4B4B);
  static const muted = Color(0xFF777777);
  static const line = Color(0xFFE5E5E5);
  static const light = Color(0xFFF7F7F7);
  static const darkBg = Color(0xFF141F22);
  static const darkSurface = Color(0xFF1D2C30);
  static const darkLine = Color(0xFF34464C);
  static const darkText = Color(0xFFF5F8F8);
  static const darkMuted = Color(0xFFA8B8BC);
  static const darkGreen = Color(0xFF25452B);
  static const darkOrange = Color(0xFF4A3521);
  static const darkBlue = Color(0xFF214257);
  static const darkYellow = Color(0xFF4C421F);

  static bool isDark(BuildContext context) =>
      Theme.of(context).brightness == Brightness.dark;
  static Color surface(BuildContext context, Color requested) {
    if (!isDark(context)) return requested;
    if (requested == Colors.white || requested == light) return darkSurface;
    if (requested == greenLight) return darkGreen;
    if (requested == orangeLight) return darkOrange;
    if (requested == blueLight) return darkBlue;
    if (requested == yellowLight) return darkYellow;
    return requested;
  }

  static Color stroke(BuildContext context, Color requested) =>
      isDark(context) && requested == line ? darkLine : requested;
}

class FolkButton extends StatelessWidget {
  const FolkButton({
    super.key,
    required this.text,
    required this.onPressed,
    this.color = FolkColors.green,
    this.shadow = FolkColors.greenDark,
    this.icon,
  });
  final String text;
  final VoidCallback? onPressed;
  final Color color;
  final Color shadow;
  final IconData? icon;

  @override
  Widget build(BuildContext context) => Opacity(
    opacity: onPressed == null ? .5 : 1,
    child: GestureDetector(
      onTap: onPressed,
      child: Container(
        width: double.infinity,
        height: 53,
        decoration: BoxDecoration(
          color: color,
          borderRadius: BorderRadius.circular(15),
          border: Border(bottom: BorderSide(color: shadow, width: 4)),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (icon != null) ...[
              Icon(icon, size: 20, color: Colors.white),
              const SizedBox(width: 7),
            ],
            Text(
              text.toUpperCase(),
              style: Theme.of(
                context,
              ).textTheme.labelLarge!.copyWith(color: Colors.white),
            ),
          ],
        ),
      ),
    ),
  );
}

class FolkCard extends StatelessWidget {
  const FolkCard({
    super.key,
    required this.child,
    this.color = Colors.white,
    this.border = FolkColors.line,
    this.padding = const EdgeInsets.all(16),
    this.onTap,
  });
  final Widget child;
  final Color color;
  final Color border;
  final EdgeInsets padding;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) => Material(
    color: FolkColors.surface(context, color),
    borderRadius: BorderRadius.circular(20),
    child: InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(20),
      child: Container(
        width: double.infinity,
        padding: padding,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: FolkColors.stroke(context, border),
            width: 1.5,
          ),
        ),
        child: child,
      ),
    ),
  );
}

class Eyebrow extends StatelessWidget {
  const Eyebrow(this.text, {super.key, this.color = FolkColors.muted});
  final String text;
  final Color color;
  @override
  Widget build(BuildContext context) => Text(
    text.toUpperCase(),
    style: TextStyle(
      color: FolkColors.isDark(context) && color == FolkColors.muted
          ? FolkColors.darkMuted
          : color,
      fontSize: 11,
      fontWeight: FontWeight.w900,
      letterSpacing: 1.1,
    ),
  );
}

class PageTitle extends StatelessWidget {
  const PageTitle(this.title, this.subtitle, {super.key});
  final String title;
  final String subtitle;
  @override
  Widget build(BuildContext context) => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text(title, style: Theme.of(context).textTheme.headlineLarge),
      const SizedBox(height: 5),
      Text(subtitle, style: Theme.of(context).textTheme.bodyMedium),
    ],
  );
}

class AssetIcon extends StatelessWidget {
  const AssetIcon(this.asset, {super.key, this.size = 25});
  final String asset;
  final double size;
  @override
  Widget build(BuildContext context) => Image.asset(
    'assets/images/$asset',
    width: size,
    height: size,
    fit: BoxFit.contain,
  );
}

class KomiFlag extends StatelessWidget {
  const KomiFlag({super.key});

  @override
  Widget build(BuildContext context) => Container(
    width: 37,
    height: 27,
    decoration: BoxDecoration(
      border: Border.all(
        color: FolkColors.isDark(context)
            ? FolkColors.darkLine
            : FolkColors.line,
      ),
      borderRadius: BorderRadius.circular(7),
    ),
    child: ClipRRect(
      borderRadius: BorderRadius.circular(6),
      child: const Column(
        children: [
          Expanded(child: ColoredBox(color: Color(0xFF2E86D1))),
          Expanded(child: ColoredBox(color: Color(0xFF13A538))),
          Expanded(child: ColoredBox(color: Colors.white)),
        ],
      ),
    ),
  );
}

class StatPill extends StatelessWidget {
  const StatPill({
    super.key,
    required this.asset,
    required this.value,
    required this.color,
  });
  final String asset;
  final String value;
  final Color color;
  @override
  Widget build(BuildContext context) => Row(
    mainAxisSize: MainAxisSize.min,
    children: [
      AssetIcon(asset, size: 25),
      const SizedBox(width: 3),
      Text(
        value,
        style: TextStyle(
          color: color,
          fontSize: 15,
          fontWeight: FontWeight.w900,
        ),
      ),
    ],
  );
}

class MascotBubble extends StatelessWidget {
  const MascotBubble({super.key, required this.text});
  final String text;
  @override
  Widget build(BuildContext context) => SizedBox(
    height: 135,
    child: Row(
      children: [
        Image.asset(
          'assets/images/mascot-explaining.png',
          width: 113,
          fit: BoxFit.contain,
        ),
        const SizedBox(width: 4),
        Expanded(
          child: Container(
            alignment: Alignment.center,
            padding: const EdgeInsets.symmetric(horizontal: 13),
            decoration: BoxDecoration(
              color: FolkColors.isDark(context)
                  ? FolkColors.darkSurface
                  : Colors.white,
              border: Border.all(
                color: FolkColors.isDark(context)
                    ? FolkColors.darkLine
                    : FolkColors.line,
                width: 2,
              ),
              borderRadius: BorderRadius.circular(22),
            ),
            child: Text(
              text,
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.titleMedium,
            ),
          ),
        ),
      ],
    ),
  );
}

class FolkBottomBar extends StatelessWidget {
  const FolkBottomBar({super.key, required this.index, required this.onTap});
  final int index;
  final ValueChanged<int> onTap;
  static const icons = [
    Icons.home_rounded,
    Icons.backpack_rounded,
    Icons.emoji_events_rounded,
    Icons.forum_rounded,
    Icons.person_rounded,
  ];
  static const labels = [
    'Изучение',
    'Задания',
    'Рейтинг',
    'Новости',
    'Профиль',
  ];

  @override
  Widget build(BuildContext context) => Container(
    height: 75,
    padding: const EdgeInsets.fromLTRB(12, 7, 12, 9),
    decoration: BoxDecoration(
      color: FolkColors.isDark(context) ? FolkColors.darkBg : Colors.white,
      border: Border(
        top: BorderSide(
          color: FolkColors.isDark(context)
              ? FolkColors.darkLine
              : FolkColors.line,
          width: 1.5,
        ),
      ),
    ),
    child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: List.generate(
        icons.length,
        (i) => Semantics(
          label: labels[i],
          button: true,
          selected: i == index,
          child: InkWell(
            onTap: () => onTap(i),
            borderRadius: BorderRadius.circular(13),
            child: Container(
              width: 58,
              height: 53,
              decoration: BoxDecoration(
                color: i == index
                    ? (FolkColors.isDark(context)
                          ? FolkColors.darkBlue
                          : FolkColors.blueLight)
                    : Colors.transparent,
                borderRadius: BorderRadius.circular(13),
                border: i == index
                    ? Border.all(color: const Color(0xFF84D8FF), width: 2)
                    : null,
              ),
              child: Icon(
                icons[i],
                color: i == index
                    ? FolkColors.blue
                    : [
                        FolkColors.orange,
                        FolkColors.yellow,
                        FolkColors.blue,
                        const Color(0xFFE67DB7),
                        FolkColors.blue,
                      ][i],
                size: 27,
              ),
            ),
          ),
        ),
      ),
    ),
  );
}
